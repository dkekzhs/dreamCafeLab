from shapely.geometry import shape, Polygon, Point, MultiPolygon
import geopandas as gpd
import mysql.connector

gdf = gpd.read_file('./sang.geojson')
cnx = mysql.connector.connect(user='root', password='ssafy', host='localhost', database='rent')

# 좌표 순서를 바꿔주는 함수
def reverse_coords(geom):
    if isinstance(geom, Polygon):
        return Polygon([coord[::-1] for coord in geom.exterior.coords])
    elif isinstance(geom, MultiPolygon):
        return MultiPolygon([Polygon([coord[::-1] for coord in sub_geom.exterior.coords]) for sub_geom in geom.geoms])
    elif isinstance(geom, Point):
        return Point(geom.coords[::-1])

# 각 행을 MySQL에 저장
for index, row in gdf.iterrows():
    # adm_cd, adm_nm, geometry 추출
    trdar_cd = row['TRDAR_CD']
    trdar_se = row['TRDAR_SE_1']
    trdar_cd_n = row['TRDAR_CD_N']
    gu = row['SIGNGU_CD_']
    dong = row['ADSTRD_CD_']
    curs = cnx.cursor()

    sql = f"SELECT id FROM gu WHERE sig_kor_nm = '{gu}'"
    curs.execute(sql)
    data = curs.fetchone()
    print(data[0])
    sql = f"SELECT id FROM dong WHERE adm_nm = '{dong}'"
    print(dong)
    curs.execute(sql)
    try :
        data2 = curs.fetchone()
    except Exception as e :
        print(e)
        print(dong)
    print(data2[0])
    curs.fetchall() # 모든 결과를 읽어오는 코드 추가
    curs.close()

    geometry = shape(row['geometry'])
    geometry = reverse_coords(geometry).wkt

    cursor = cnx.cursor()
    query = ("INSERT INTO sang "
             "(trdar_cd,trdar_se, trdar_cd_n,gu_id,dong_id, geometry) "
             "VALUES (%s,%s, %s,%s,%s, ST_GeomFromText(%s, 4326))")
    try :
        cursor.execute(query, (trdar_cd,trdar_se,trdar_cd_n,data[0],data2[0], geometry))
    except Exception as e:
        print(e)
# commit
cnx.commit()

# cursor와 connection 종료
cursor.close()
cnx.close()