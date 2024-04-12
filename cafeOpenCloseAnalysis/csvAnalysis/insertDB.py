import glob
import os
import time

import pandas as pd
from dotenv import load_dotenv
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from geoalchemy2 import Geometry, WKTElement


# 기반 클래스 생성
Base = declarative_base()

# 데이터베이스 테이블 정의
class Cafe(Base):
    __tablename__ = 'cafe'
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(255))
    open = Column(String(7))
    close = Column(String(7))
    location = Column(Geometry('POINT', srid=0, spatial_index=True), nullable=False)

def insertDB(csv_directory):
    bFirstInsert = True
    # .env 파일 로드
    load_dotenv()

    # 환경 변수에서 데이터베이스 연결 정보 가져오기
    db_user = os.getenv("DB_USER")
    db_password = os.getenv("DB_PASSWORD")
    db_host = os.getenv("DB_HOST")
    db_port = os.getenv("DB_PORT")
    db_name = os.getenv("DB_NAME")

    # MySQL 연결 정보
    db_url = f"mysql://{db_user}:{db_password}@{db_host}:{db_port}/{db_name}"
    engine = create_engine(db_url)

    Base.metadata.create_all(engine)

    Session = sessionmaker(bind=engine)
    session = Session()
    # CSV 파일이 있는 디렉토리 경로
    csv_directory = csv_directory  # 디렉토리 경로 수정 필요

    # 디렉토리 내의 모든 CSV 파일 경로 가져오기
    csv_files = glob.glob(os.path.join(csv_directory, "*.csv"))

    try:
        # 모든 CSV 파일을 MySQL 데이터베이스에 삽입
        for csv_file_path in csv_files:
            # CSV 파일을 데이터프레임으로 읽기
            df = pd.read_csv(csv_file_path)

            # 데이터프레임의 열 이름을 데이터베이스 테이블의 열 이름에 맞게 수정
            df = df.rename(columns={
                '상호명': 'name',
                '개업 년월': 'open',
                '마지막 확인 년월': 'close',
                '위도': 'lat',
                '경도': 'lon',
            })

            # POINT 데이터 생성 및 SRID 0 할당
            df['location'] = df.apply(lambda row: WKTElement(f"POINT({row['lat']} {row['lon']})", srid=0), axis=1)
            df = df.drop(['lat', 'lon'], axis=1)

            # 데이터프레임을 MySQL 데이터베이스에 삽입 (500개씩 나눠서)
            chunk_size = 3000
            for i in range(0, len(df), chunk_size):
                chunk = df[i:i + chunk_size]

                if bFirstInsert:
                    bFirstInsert = False
                    chunk.to_sql('cafe', con=engine, index=False, if_exists='replace', method='multi',
                                 chunksize=len(chunk),
                                 dtype={'location': Geometry('POINT', srid=0), 'open': String(7),
                                        'name': String(255), 'close': String(7)})
                else:
                    chunk.to_sql('cafe', con=engine, index=False, if_exists='append', method='multi',
                                 chunksize=len(chunk),
                                 dtype={'location': Geometry('POINT', srid=0), 'open': String(7),
                                        'name': String(255), 'close': String(7)})

                time.sleep(1)

    except Exception as e:
        print(e)
    # 세션 종료
    session.close()
