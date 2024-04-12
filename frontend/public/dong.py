from shapely.geometry import shape, Polygon, Point, MultiPolygon
import geopandas as gpd
import mysql.connector

gdf = gpd.read_file('./dong.geojson')
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
    adm_cd = row['adm_cd']
    adm_nm = row['adm_nm']
    si,gu,dong = adm_nm.split(" ")
    curs = cnx.cursor()
    sql = f"SELECT id FROM gu WHERE sig_kor_nm = '{gu}'"
    curs.execute(sql)
    data = curs.fetchone()
    print(data[0])
    curs.close()

    geometry = shape(row['geometry'])
    geometry = reverse_coords(geometry).wkt

    cursor = cnx.cursor()
    query = ("INSERT INTO dong "
             "(adm_cd,gu_id, adm_nm, geometry) "
             "VALUES (%s,%s, %s, geomFromWKT(%s, 4326))")
    try :
        cursor.execute(query, (adm_cd,data[0], dong, geometry))
    except Exception as e:
        print(adm_cd,data[0],dong,geometry)
        print(e)
# commit
cnx.commit()

# cursor와 connection 종료
cursor.close()
cnx.close()