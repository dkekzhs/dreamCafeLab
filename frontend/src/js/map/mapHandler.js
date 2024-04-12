import {
  centerToPloygonData,
  getDongCenter,
  getGuCenter,
  getCenterToXy
} from '@/js/map/mapDistanceUtils'
import { feature } from 'turf'
import { setSangCategoriesSetting } from '@/js/map/mapUtils'
//구를 재선택할 경우 동,상권 초기화 및 다시 가져오고 줌인
export async function handleGuChange(
  map,
  guName,
  dong,
  dongCategories,
  sang,
  sangCategories,
  loadDong,
  mapStore
) {
  dong.value = []
  dongCategories.value = []
  sang.value = []
  sangCategories.value = []
  await mapStore.clearData()
  const guPolygon = await getGuCenter(guName)
  const coord = await centerToPloygonData(guPolygon)
  map.value.morph(coord.geometry.coordinates, 13)
  await loadDong(guName)
}

// 동을 재선택할 경우 상권을 초기화 한 후  해당 동 상권 가져옴
export async function handleDongChange(map, dongName, sang, loadSang) {
  sang.value = []
  console.log(dongName)
  const dongPolygon = await getDongCenter(dongName)
  const coord = await centerToPloygonData(dongPolygon)
  await loadSang(dongName)

  map.value.morph(coord.geometry.coordinates, 14)
}

// 상권을 클릭할 경우 상권 보여주기 + 이동
export const handleAreaClick = async (map, e, geojson, mapStore, sang, sangCategories) => {
  if (e.feature) {
    let sangName = e.feature.properties?.TRDAR_CD_N
    if (!sangName) sangName = e.feature.getProperty('TRDAR_CD_N')

    let dongName = e.feature.properties?.ADSTRD_CD_
    if (!dongName) dongName = e.feature.getProperty('ADSTRD_CD_')
    // 이전에 선택한 영역의 스타일 초기화
    map.value.data.forEach((feature) => {
      map.value.data.overrideStyle(feature, {
        fillColor: 'rgb(60 179 113)',
        fillOpacity: 0.2,
        strokeWeight: 3,
        strokeColor: 'rgb(60 179 113)'
      })
    })
    // 현재 선택한 영역 스타일 변경
    map.value.data.forEach((feature) => {
      const naverFeatureCode = feature.getProperty('TRDAR_CD_N')
      if (naverFeatureCode === sangName) {
        map.value.data.overrideStyle(feature, {
          fillColor: 'rgb(16 153 114)',
          fillOpacity: 0.8,
          strokeColor: 'rgb(16 153 114)',
          strokeStyle: 'solid',
          strokeWeight: 3,
          clickable: true,
          visible: true
        })
      }
    })
    const xy = await getCenterToXy(e.feature.properties.XCNTS_VALU, e.feature.properties.YDNTS_VALU)
    map.value.morph(new naver.maps.LatLng(xy[1], xy[0]), 15)
  }
}

// 위치로 받아왔을 떄 상권이 바로 선택되게 하도록 하는 핸들러
export const handleLocationClick = async (map, e, geojson, mapStore, sang, sangCategories) => {
  if (e) {
    let sangName = e.properties?.TRDAR_CD_N
    if (!sangName) sangName = e.getProperty('TRDAR_CD_N')

    let dongName = e.properties?.ADSTRD_CD_
    if (!dongName) dongName = e.getProperty('ADSTRD_CD_')
    setSangCategoriesSetting(dongName, sangName, mapStore, sang, sangCategories)

    // 이전에 선택한 영역의 스타일 초기화
    map.value.data.forEach((feature) => {
      map.value.data.overrideStyle(feature, {
        fillColor: 'transparent', // 배경 없음
        fillOpacity: 0, // 배경 없음
        strokeWeight: 1 // 기본 선 굵기
      })
    })

    // 현재 선택한 영역 스타일 변경
    map.value.data.forEach((feature) => {
      const naverFeatureCode = feature.getProperty('TRDAR_CD_N')
      if (naverFeatureCode === sangName) {
        map.value.data.overrideStyle(feature, {
          fillColor: 'red',
          fillOpacity: 0.6,
          strokeWeight: 2
        })
      }
    })
    let center = await centerToPloygonData(e)
    map.value.morph(
      new naver.maps.LatLng(center.geometry.coordinates[1], center.geometry.coordinates[0]),
      14
    )
  }
}
