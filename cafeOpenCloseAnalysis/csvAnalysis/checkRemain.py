import os
import csv

# 디렉토리 경로
directory = r'C:\SSAFY\01_workspace\S10P22A703\cafeOpenCloseAnalysis\ret\test'

# 상권별로 2023년 이전의 데이터 개수를 저장할 딕셔너리
cafe_counts = {}

# 디렉토리 내의 모든 CSV 파일에 대해 처리
for filename in os.listdir(directory):
    if filename.endswith('.csv'):
        file_path = os.path.join(directory, filename)

        with open(file_path, 'r', encoding='utf-8') as file:
            reader = csv.DictReader(file)
            for row in reader:
                trade_area_id = row['상권 아이디']  # 상권 아이디는 데이터에 따라 다를 수 있으니 실제 데이터에 맞게 변경해주세요
                if trade_area_id == '-1':
                    continue
                last_checked_year_month = row['마지막 확인 년월']

                # 2023년 이전인 경우 해당 상권의 데이터 개수를 증가시킴
                if last_checked_year_month < '2023-01':
                    cafe_counts[trade_area_id] = cafe_counts.get(trade_area_id, 0) + 1

# 결과를 CSV 파일로 저장
output_file = 'cafe_counts.csv'
with open(output_file, 'w', newline='', encoding='utf-8') as csvfile:
    fieldnames = ['상권 아이디', '2023년 이전 카페 수']
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    writer.writeheader()

    for trade_area_id, count in cafe_counts.items():
        writer.writerow({'상권 아이디': trade_area_id, '2023년 이전 카페 수': count})


print(f"결과가 {output_file}에 저장되었습니다.")