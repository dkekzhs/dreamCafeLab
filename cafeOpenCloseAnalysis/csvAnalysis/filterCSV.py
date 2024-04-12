import csv
import json
import os
from collections import defaultdict

import pandas as pd
from shapely.geometry import Point, shape
import re
from pyspark.sql import SparkSession
from pyspark.sql.functions import col, lit, lag, when, concat, format_string, first, last, to_date, date_format, \
    radians, sin, cos, sqrt, asin, row_number
from pyspark.sql.window import Window
import pyspark

from csvAnalysis.getEncoding import detect_file_encoding


def extract_year_month(filename):
    match = re.search(r'(\d{6})', filename)
    if match:
        date = match.groups()[0]
        return int(date[:4]),  int(date[4:6])
def extract_year(filename):
    match = re.search(r'(\d{6})', filename)
    if match:
        date = match.groups()[0]
        # print(date[:4])
        return date[:4]

def determine_separator(file_path, file_encoding):
    with open(file_path, 'r', encoding=file_encoding) as file:
        first_line = file.readline()
        if ',' in first_line:
            return ','
        elif '\t' in first_line:
            return '\t'
        elif '|' in first_line:
            return '|'
        # 여러 다른 구분자에 대한 추가 판단 로직을 추가할 수 있습니다.
        else:
            print(f"구분자를 식별할 수 없습니다. 파일: {file_path}")
            return None
def filter_cafe_by_year_and_area(directory_path, target_year, target_area):
    # 디렉터리 내의 모든 파일 목록 가져오기
    all_files = os.listdir(directory_path)

    # 특정 년도를 포함하는 파일들 필터링
    matching_files = [filename for filename in all_files if extract_year(filename) == target_year]

    if not matching_files:
        print(f'{target_year}년을 포함하는 파일이 없습니다.')
        return

    # 파일들을 하나로 병합
    dfs = []

    for filename in matching_files:
        file_encoding = detect_file_encoding(os.path.join(directory_path, filename))
        print(f"Detected encoding: {file_encoding}")
        seperator = determine_separator(directory_path + "/" + filename, file_encoding)
        print(f"Detected seperator: {seperator}")

        file_df = pd.read_csv(os.path.join(directory_path, filename), sep=seperator, encoding=file_encoding,  on_bad_lines='skip')
        # 파일명에서 추출한 년도와 월 정보를 칼럼으로 추가
        file_df['년도'], file_df['월'] = extract_year_month(filename)
        dfs.append(file_df)

    merged_df = pd.concat(dfs, ignore_index=True)

    # "카페"이면서 시도명이 "서울"인 행만 필터링
    cafe_df = merged_df[(merged_df['상권업종소분류명'].str.contains('카페', case=False, na=False)) & (
        merged_df['시도명'].str.contains(target_area, case=False, na=False))]


    if cafe_df.empty:
        print(f'{target_year}년을 포함하는 파일 중 "{target_area}" 시도명인 카페 데이터가 없습니다.')
        return

    for year_month, group_df in cafe_df.groupby(['년도', '월']):
        output_file_path = os.path.join("ret", f'{year_month[0]}_{str(year_month[1]).zfill(2)}_filtered_cafe_seoul.csv')
        group_df.to_csv(output_file_path, index=False)
        print(f'{year_month[0]}년 {year_month[1]}월 데이터를 병합하여 "{output_file_path}"에 저장되었습니다.')


    # 병합 및 필터링된 데이터를 CSV 파일로 저장
    output_file_path = os.path.join("ret", f'{target_year}_filtered_cafe_seoul.csv')
    group_df.to_csv(output_file_path, index=False, encoding="utf-8")

    print(f'{target_year}년을 포함하는 파일 중 "서울" 시도명인 카페 데이터를 병합하여 {output_file_path}에 저장되었습니다.')


def filter_open_close():
    # SparkSession 생성
    spark = SparkSession.builder \
        .appName("Analysis") \
        .config("spark.executor.memory", "16g") \
        .config("spark.driver.memory", "16g") \
        .getOrCreate()
    # CSV 파일이 저장된 디렉토리 경로
    directory_path = "./ret"

    # 초기 빈 데이터프레임 생성
    all_data = None

    # 디렉토리 내의 모든 파일을 확인하고 데이터프레임에 추가
    for filename in os.listdir(directory_path):
        if filename.endswith(".csv"):
            try:
                # 파일명에서 년도와 월 정보 추출
                match = re.search(r'(\d{4})_(\d{2})_filtered_cafe_seoul', filename)
                if match:
                    year, month = match.groups()
                else:
                    print(f"{filename} 파일은 유효한 년월 정보를 포함하지 않아 스킵합니다.")
                    continue

                # CSV 파일을 읽어와 데이터프레임에 추가하고 '년도', '월' 열 추가
                data = spark.read.csv(os.path.join(directory_path, filename), header=True, encoding='utf-8')
                data = data.withColumn("년도", lit(int(year)))
                data = data.withColumn("월", lit(int(month)))

                # 데이터프레임을 합치기
                if all_data is None:
                    all_data = data.select("상호명", "년도", "월", "시군구코드", "시군구명", "행정동코드", "행정동명", "법정동코드", "법정동명", "위도", "경도")
                else:
                    all_data = all_data.union(data.select("상호명", "년도", "월", "시군구코드", "시군구명", "행정동코드", "행정동명", "법정동코드", "법정동명", "위도", "경도"))
            except Exception as e:
                print(f"에러가 발생한 파일명 : {filename}")


    # 상호명을 기준으로 정렬
    windowSpec = Window().partitionBy("상호명").orderBy("년도", "월")

    min_max_dates = None

    try:
        # 처음과 마지막 언급된 년월을 추출
        min_max_dates = all_data.groupBy("상호명").agg(
            first(concat(col("년도"), lit("-"), format_string("%02d", col("월")))).alias("개업 년월"),
            last(concat(col("년도"), lit("-"), format_string("%02d", col("월")))).alias("마지막 확인 년월")
        )
    except Exception as e:
        print(f"에러 >> {e}")

    # 결과 데이터프레임에 조인
    result_data = all_data.join(min_max_dates, on="상호명", how="left")

    # 필요한 컬럼만 선택
    result_data = result_data.select("상호명", "개업 년월", "마지막 확인 년월", "시군구코드", "시군구명", "행정동코드", "행정동명", "법정동코드", "법정동명", "위도", "경도")

    # 중복된 로우 제거
    result_data = result_data.dropDuplicates()

    # 상호별로 년,월 오름차순으로 정렬
    result_data = result_data.orderBy("상호명")

    # 결과를 출력
    # result_data.select("상호명", "년도", "월", "영업상태 변경").orderBy("상호명", "년도", "월").show(truncate=False)

    # 이전 행의 위도와 경도 가져오기
    windowSpec = Window().partitionBy("상호명").orderBy("위도")
    result_data = result_data.withColumn("prev_lat", lag("위도").over(windowSpec))
    result_data = result_data.withColumn("prev_lon", lag("경도").over(windowSpec))

    # 거리 필터링
    result_data = result_data.withColumn("distance", haversine_distance(col("위도"), col("경도"), col("prev_lat"), col("prev_lon")))
    result_data_filtered = result_data.filter((col("distance") > 30) | (col("prev_lat").isNull()))
    result_data_filtered = result_data_filtered.drop("prev_lat", "prev_lon", "distance")

    # 필요한 컬럼 선택
    final_result = result_data_filtered.select("상호명", "개업 년월", "마지막 확인 년월", "시군구코드", "시군구명", "행정동코드", "행정동명", "법정동코드", "법정동명", "위도", "경도")

    # 결과 출력
    final_result.show(truncate=False)


    # 결과를 CSV 파일로 저장
    final_result.write.csv("C:/ssafy/01_workspace/S10P22A703/cafeOpenCloseAnalysis/ret/duration", header=True, mode="overwrite")


def calculate_statistics():
    # 디렉토리 내의 모든 파일 목록 가져오기
    directory_path = "C:/ssafy/01_workspace/S10P22A703/cafeOpenCloseAnalysis/ret/duration/"
    all_files = os.listdir(directory_path)

    # 빈 리스트 생성
    data_frames = []

    # 각 파일에 대해 반복하여 데이터 로드 및 처리
    for filename in all_files:
        if filename.endswith(".csv"):
            file_path = os.path.join(directory_path, filename)
            # CSV 데이터 로드
            file_data = pd.read_csv(file_path)
            # "마지막 확인 년월"이 2023-12가 아닌 행을 찾아서 폐업한 곳으로 간주
            closed_data = file_data[file_data["마지막 확인 년월"] != "2023-12"]
            # 데이터프레임을 리스트에 추가
            data_frames.append(file_data)

    # 모든 데이터프레임을 하나로 병합
    combined_data = pd.concat(data_frames, ignore_index=True)

    # 시군구명별 폐업률 계산
    total_by_city = combined_data.groupby("시군구명").size()
    closed_by_city = closed_data.groupby("시군구명").size()
    print(total_by_city)
    print(closed_by_city)
    closure_rate_by_city = (closed_by_city / total_by_city) * 100

    # 행정동명별 폐업률 계산
    total_by_district = combined_data.groupby("행정동명").size()
    closed_by_district = closed_data.groupby("행정동명").size()

    print(total_by_district)
    print(closed_by_district)
    closure_rate_by_district = (closed_by_district / total_by_district) * 100

    # 법정동명별 폐업률 계산
    total_by_legal_district = combined_data.groupby("법정동명").size()
    closed_by_legal_district = closed_data.groupby("법정동명").size()
    print("total_by_legal_district >> ", total_by_legal_district)
    print("closed_by_legal_district >>", closed_by_legal_district)
    closure_rate_by_legal_district = (closed_by_legal_district / total_by_legal_district) * 100

    # Create DataFrames for closure rates
    closure_rate_city_df = closure_rate_by_city.reset_index()
    closure_rate_city_df.columns = ['시군구명', '폐업률']

    closure_rate_district_df = closure_rate_by_district.reset_index()
    closure_rate_district_df.columns = ['행정동명', '폐업률']

    closure_rate_legal_district_df = closure_rate_by_legal_district.reset_index()
    closure_rate_legal_district_df.columns = ['법정동명', '폐업률']

    # Save to CSV files
    closure_rate_city_df.to_csv("C:/ssafy/01_workspace/S10P22A703/cafeOpenCloseAnalysis/ret/stats/business_closure_rate_by_city.csv", index=False, encoding='utf-8-sig')
    closure_rate_district_df.to_csv("C:/ssafy/01_workspace/S10P22A703/cafeOpenCloseAnalysis/ret/stats/business_closure_rate_by_district.csv", index=False, encoding='utf-8-sig')
    closure_rate_legal_district_df.to_csv("C:/ssafy/01_workspace/S10P22A703/cafeOpenCloseAnalysis/ret/stats/business_closure_rate_by_legal_district.csv", index=False, encoding='utf-8-sig')


def haversine_distance(lat1, lon1, lat2, lon2):
    # Radius of the Earth in kilometers
    R = 6371.0

    # Convert latitude and longitude from degrees to radians
    lat1_rad = radians(lat1)
    lon1_rad = radians(lon1)
    lat2_rad = radians(lat2)
    lon2_rad = radians(lon2)

    # Calculate the differences in coordinates
    dlat = lat2_rad - lat1_rad
    dlon = lon2_rad - lon1_rad

    # Haversine formula
    a = sin(dlat / 2)**2 + cos(lat1_rad) * cos(lat2_rad) * sin(dlon / 2)**2
    c = 2 * asin(sqrt(a))

    # Distance in meters
    distance = R * c * 1000

    return distance


def assign_trade_area_id(geojson_file, cafe_data_dir, output_dir):
    # 상권 정보를 저장할 딕셔너리
    trade_area_info = {}

    # geojson 파일 로드
    with open(geojson_file, 'rt', encoding="UTF-8") as f:
        data = json.load(f)

    # 상권 정보 추출하여 딕셔너리에 저장
    for feature in data['features']:
        trade_area_id = feature['properties']['TRDAR_CD']
        trade_area_polygon = shape(feature['geometry'])
        trade_area_info[trade_area_id] = trade_area_polygon

    # 카페 데이터 디렉토리에서 파일 불러오기
    cafe_files = [file for file in os.listdir(cafe_data_dir) if file.endswith('.csv')]
    print(cafe_files)

    for file_name in cafe_files:
        input_file_path = os.path.join(cafe_data_dir, file_name)
        output_file_path = os.path.join(output_dir, file_name)
        print(input_file_path)
        print(output_file_path)

        with open(input_file_path, mode='r', encoding="UTF-8") as input_file:
            reader = csv.DictReader(input_file)
            fieldnames = reader.fieldnames + ['상권 아이디']
            cafes = list(reader)

        with open(output_file_path, mode='w', encoding='UTF8', newline='') as output_file:
            writer = csv.DictWriter(output_file, fieldnames=fieldnames)
            writer.writeheader()

            # 각 카페에 상권 아이디 부여하여 새로운 칼럼에 추가
            for cafe in cafes:
                cafe_location = Point(float(cafe['경도']), float(cafe['위도']))
                for trade_area_id, trade_area_polygon in trade_area_info.items():
                    if trade_area_polygon.contains(cafe_location):
                        cafe['상권 아이디'] = trade_area_id
                        break
                else:
                    cafe['상권 아이디'] = -1
                writer.writerow(cafe)

        print(file_name + " 상권 아이디가 성공적으로 부여되었습니다.")









def calculate_percentage(cafe_data_dir):
    # 상권 아이디별로 년도별 개업 년월과 마지막 확인 년월 건수를 저장할 딕셔너리
    data_by_trade_area = defaultdict(lambda: defaultdict(int))
    open_data = defaultdict(lambda: defaultdict(int))
    close_data = defaultdict(lambda: defaultdict(int))
    cnt = 0
    # CSV 파일을 읽어 상권 아이디별로 데이터 분석
    for file_name in os.listdir(cafe_data_dir):
        file_path = os.path.join(cafe_data_dir, file_name)
        with open(file_path, 'r', encoding='utf-8') as file:
            reader = csv.DictReader(file)
            for row in reader:
                cnt += 1
                trade_area_id = row['상권 아이디']
                open_year_month = row['개업 년월']
                last_checked_year_month = row['마지막 확인 년월']



                # 개업 년월과 마지막 확인 년월에서 년도 추출
                open_year = open_year_month.split('-')[0]
                open_month = open_year_month.split('-')[1]
                last_checked_year = last_checked_year_month.split('-')[0]
                last_checked_month = last_checked_year_month.split('-')[1]

                # 년도별 개업 년월과 마지막 확인 년월 건수 계산
                data_by_trade_area[trade_area_id][(open_year_month, last_checked_year_month)] += 1
                open_data[open_year]['total'] += 1
                open_data[open_year][open_month] += 1

                # 마지막 확인 년월이 2023-09인 데이터는 제외
                if last_checked_year_month == '2023-09':
                    continue

                close_data[last_checked_year]['total'] += 1
                close_data[last_checked_year][last_checked_month] += 1


    return [data_by_trade_area, open_data, close_data]

def save_to_csv(data_by_trade_area, open_data, close_data, output_file):
    with open(output_file, 'w', newline='', encoding='utf-8') as csvfile:
        fieldnames = ['상권 아이디', '년도', "분기", '개업', '폐업']
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writeheader()

        # 데이터를 저장할 리스트
        output_data = []
        unique_trade_area_ids = set(data_by_trade_area.keys())

        # open_count와 close_count를 defaultdict로 초기화합니다.
        open_count = defaultdict(lambda: defaultdict(int))
        close_count = defaultdict(lambda: defaultdict(int))

        # 2015년 3월부터 2023년 3월까지의 개업과 폐업 통계 계산
        for year in range(2015, 2024):
            for quarter in range(1, 5):
                # 해당 분기의 시작 월과 끝 월 계산
                month = quarter * 3

                # 각 상권 아이디별로 데이터 합산
                for trade_area_id in unique_trade_area_ids:
                    if trade_area_id == -1:
                        continue
                    open_count_value = 0
                    close_count_value = 0

                    # 개업 건수 합산
                    for (start_year_month, end_year_month), count in data_by_trade_area[trade_area_id].items():
                        if int(start_year_month.split('-')[0]) == year and int(
                                start_year_month.split('-')[1]) == month:
                            open_count_value += count
                        if int(end_year_month.split('-')[0]) == year and int(
                                end_year_month.split('-')[1]) == month:
                            close_count_value += count

                    # 결과를 출력 데이터에 추가
                    output_data.append({
                        '상권 아이디': trade_area_id,
                        '년도': year,
                        '분기': quarter,
                        '개업': open_count_value,
                        '폐업': close_count_value
                    })


            writer.writerows(output_data)