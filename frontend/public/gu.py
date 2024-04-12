from shapely.geometry import shape, Polygon, Point, MultiPolygon
import geopandas as gpd
import mysql.connector

gdf = gpd.read_file('./gu.geojson')
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
    sig_cd = row['SIG_CD']
    sig_kor_nm = row['SIG_KOR_NM']
    geometry = shape(row['geometry'])
    geometry = reverse_coords(geometry).wkt
    # MySQL에 저장
    cursor = cnx.cursor()
    query = ("INSERT INTO gu "
             "(sig_cd, sig_kor_nm, geometry) "
             "VALUES (%s, %s, ST_GeomFromText(%s, 4326))")
    cursor.execute(query, (sig_cd, sig_kor_nm, geometry))
cnx.commit()

# cursor와 connection 종료
cursor.close()
cnx.close()