import * as turf from '@turf/turf'
import proj4 from 'proj4'

export function isPointInsidePolygon(polygon, point) {
  let temp = null
  if (polygon.features[0].geometry.type === 'Polygon') {
    temp = turf.polygon(polygon.geometry.coordinates)
  } else if (polygon.features[0].geometry.type === 'MultiPolygon') {
    temp = turf.multiPolygon(polygon.features[0].geometry.coordinates)
  }

  const pt = turf.point(point)
  return turf.booleanPointInPolygon(pt, temp)
}

export function centerToPloygon(polygon) {
  let data = polygon._raw
  let temp = null
  if (data.geometry.type === 'Polygon') {
    temp = turf.polygon(data.geometry.coordinates)
  } else if (data.geometry.type === 'MutilPolygon') {
    temp = turf.multiPolygon(data.geometry.coordinates)
  }
  return turf.center(temp)
}
export async function centerToPloygonData(polygon) {
  let temp = null
  if (polygon.geometry.type == 'Polygon') {
    temp = turf.polygon(polygon.geometry.coordinates)
  } else if (polygon.geometry.type == 'MultiPolygon') {
    temp = turf.multiPolygon(polygon.geometry.coordinates)
  }
  return turf.center(temp)
}
export async function centerToPloygonDataDong(polygon) {
  let temp = null
  if (polygon.type == 'Polygon') {
    temp = turf.polygon(polygon.coordinates)
  } else if (polygon.type == 'MultiPolygon') {
    temp = turf.multiPolygon(polygon.coordinates)
  }
  return turf.center(temp)
}

export function PolygonToPointDistanceCheck(geometry, pointCoordinate) {
  const point = turf.point([pointCoordinate.lng, pointCoordinate.lat])
  let distance = Infinity

  if (geometry.type === 'Polygon' || geometry.type === 'MultiPolygon') {
    // 폴리곤 또는 멀티폴리곤을 라인으로 변환
    const convertedLine =
      geometry.type === 'Polygon'
        ? turf.polygonToLine(turf.polygon(geometry.coordinates))
        : turf.polygonToLine(turf.multiPolygon(geometry.coordinates))

    // 변환된 라인(들)에 대한 거리 계산
    if (convertedLine.type === 'FeatureCollection') {
      // FeatureCollection 내의 각 Feature에 대해 거리를 계산
      convertedLine.features.forEach((lineFeature) => {
        if (lineFeature.geometry.type === 'LineString') {
          const currentDistance = turf.pointToLineDistance(point, lineFeature, {
            units: 'kilometers'
          })
          distance = Math.min(distance, currentDistance)
        } else if (lineFeature.geometry.type === 'MultiLineString') {
          // 멀티 라인 스트링을 처리
          lineFeature.geometry.coordinates.forEach((line) => {
            const currentDistance = turf.pointToLineDistance(point, turf.lineString(line), {
              units: 'kilometers'
            })
            distance = Math.min(distance, currentDistance)
          })
        }
      })
    } else {
      distance = turf.pointToLineDistance(point, convertedLine) * 100
    }
  }
  return distance
}

export async function findClosestSang(coordinate) {
  let closestSang = null
  let minDistance = Infinity

  const response = await fetch(`${import.meta.env.VITE_SANG_GEOJSON_PATH}`)
  const sangData = await response.json()

  sangData.features.forEach((feature) => {
    let distance = PolygonToPointDistanceCheck(feature.geometry, coordinate)
    if (distance < minDistance) {
      minDistance = distance
      closestSang = feature
    }
  })
  return closestSang
}

export async function getGuCenter(guName) {
  const response = await fetch(`${import.meta.env.VITE_GU_GEOJSON_PATH}`)
  let json = await response.json()
  const feature = json.features.find((feature) => feature.properties.SIG_KOR_NM === guName)
  return feature
}
export async function getDongCenter(dongName) {
  const response = await fetch(`${import.meta.env.VITE_DONG_GEOJSON_PATH}`)
  let json = await response.json()
  const feature = json.features.find(
    (feature) => feature.properties.adm_nm.split(' ')[2] === dongName
  )
  return feature
}

export async function getCenterToXy(x, y) {
  // EPSG:5181 좌표계 정의
  let eps2097 =
    '+proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=500000 +ellps=bessel +units=m +no_defs'
  //GRS80(중부원점) 좌표계
  let grs80 =
    '+proj=tmerc +lat_0=38 +lon_0=127.5 +k=0.9996 +x_0=1000000 +y_0=2000000 +ellps=GRS80 +units=m +no_defs'
  //wgs84(위경도)좌표계
  let wgs84 = '+title=WGS 84 (long/lat) +proj=longlat +ellps=WGS84 +datum=WGS84 +units=degrees'

  // EPSG:5181 좌표계에서 EPSG:4326 좌표계로 변환
  let center = proj4(eps2097, wgs84, [x, y])
  return center
}
