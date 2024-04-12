export async function newMap(lat, lng, z) {
  // 네이버 지도 생성
  return new window.naver.maps.Map('map', {
    center: new window.naver.maps.LatLng(lat, lng),
    zoom: z
  })
}

export async function getLocation() {
  return new Promise((resolve) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (cur) => {
          const coordinates = {
            lat: cur.coords.latitude,
            lng: cur.coords.longitude
          }
          resolve(coordinates) // 좌표가 성공적으로 있을 경우 반환
        },
        (err) => {
          resolve('위치정보를 찾을 수 없습니다') // 오류가 발생한 경우 null을 반환
        }
      )
    } else {
      resolve('지원하지 않는 브라우저입니다.') // Geolocation이 지원되지 않는 경우
    }
  })
}

export function resizeMap(map) {
  var mapWidth = window.innerWidth
  var mapHeight = window.innerHeight

  // 화면 크기에 따른 맵의 너비와 높이 설정
  if (mapWidth <= 767) {
    mapWidth = Math.min(mapWidth, (80 * window.innerWidth) / 100) // 모바일 화면에서는 너비를 화면의 80%로 설정
    mapHeight = 500 // 높이는 250px
  } else if (mapWidth < 1024) {
    // 1024px 미만일 경우를 위한 조건 변경
    // 844px 같은 특정 중간 크기의 화면을 위한 조정
    mapWidth = Math.max(700, mapWidth * 0.85) // 화면 너비의 85%를 사용하되, 최소 700px는 유지
    mapHeight = 500
  } else {
    mapWidth = 1980 // 데스크탑에서는 고정 크기
    mapHeight = 500
  }

  // 맵 컨테이너의 스타일 업데이트
  var mapContainer = document.getElementById('map')
  mapContainer.style.width = mapWidth + 'px'
  mapContainer.style.height = mapHeight + 'px'

  // 네이버 맵의 크기를 업데이트
  if (map.value) {
    map.value.setSize(new naver.maps.Size(mapWidth, mapHeight))
  }
}

export async function clearFeature(map, geojson, marker) {
  if (!map.value) return
  map.value.data.removeGeoJson(geojson.value)
  map.value.data.clearListeners('click')
  marker.value.forEach((element) => {
    element.setMap(null)
  })
  marker.value = []
  // geojson.value = null
}

async function reSelectSang(reSelect, clearFeature, map, geojson) {
  console.log(reSelect)
  if (reSelect) {
    await clearFeature(map, geojson)
    await loadSang(dong.value)
    return
  }
}
// 뒤로 가기 기능
async function goBack(
  clearFeature,
  map,
  geojson,
  currentState,
  selectClear,
  loadGu,
  loadDong,
  dong,
  gu
) {
  await clearFeature(map, geojson)
  switch (currentState) {
    case 'dong':
      selectClear()
      await loadGu()
      break
    case 'sang':
      dong.value = []
      await loadDong(gu.value)
      break
    default:
      break
  }
}

export async function setSangCategoriesSetting(dongName, sangName, mapStore, sang, sangCategories) {
  await mapStore.setSangCategories(dongName)
  sangCategories.value = mapStore.sangCategories
  sang.value = sangCategories.value.filter((sang) => sang.name === sangName)[0]
}

export async function setDongCategoriesSetting(guName, dongName, mapStore, dong, dongCategories) {
  await mapStore.setDongCategories(guName)
  dongCategories.value = mapStore.dongCategories
  if (dong.value == []) return
  dong.value = dongCategories.value.filter((dong) => dong.name === dongName)[0]
}

export async function setGuCategoriesSetting(guName, mapStore, gu, guCategories) {
  await mapStore.setGuCategories()
  guCategories.value = mapStore.guCategories
  if (gu.value == []) return
  gu.value = guCategories.value.filter((gu) => gu.name === guName)[0]
}
export async function changeMarkerSize(map, markers) {
  // 지도의 현재 줌 레벨에 따라 마커의 크기를 결정하는 로직
  const zoomLevel = map.getZoom();
  let size;
  const aspectRatio = 1; // 가로 세로 비율 (1:1로 가정)

  if (zoomLevel > 15) {
    const width = 64; // 줌 레벨이 16 이상일 때 아이콘 가로 크기
    size = new naver.maps.Size(width, width * aspectRatio); // 가로 세로 비율을 유지하면서 크기 설정
  } else if (zoomLevel > 13) {
    const width = 56; // 줌 레벨이 14나 15일 때 아이콘 가로 크기
    size = new naver.maps.Size(width, width * aspectRatio);
  } else {
    const width = 48; // 줌 레벨이 13 이하일 때의 기본 크기 설정
    size = new naver.maps.Size(width, width * aspectRatio);
  }

  // 모든 마커에 대해 크기 업데이트
  markers.forEach((marker) => {
    let icon = marker.getIcon();
    if (icon) {
      icon.scaledSize = size;
      marker.setIcon(icon);
    }
  });
}

export async function areaSiSetting(borderArea, map) {
  const response = await fetch(`${import.meta.env.VITE_SI_GEOJSON_PATH}`)
  borderArea.value = await response.json()

  map.value.data.addGeoJson(borderArea.value)
  map.value.data.setStyle(function (e) {
    return {
      fillColor: '#7CFC00',
      fillOpacity: 0.05,
      strokeColor: "#32CD32",
      strokeWeight: 3,
      clickable: false,
      visible: true
    }
  })
}
export async function areaSangSetting(code, borderArea, map) {
  const response = await fetch(`${import.meta.env.VITE_SANG_GEOJSON_PATH}`)
  borderArea.value = await response.json()
  console.log(borderArea.value.features)
  borderArea.value.features = borderArea.value.features.filter(
    (feature) => feature.properties.TRDAR_CD == code
  )
  console.log(borderArea.value)
  map.value.data.addGeoJson(borderArea.value)
  map.value.data.setStyle(function (e) {
    let color = 'black'
    return {
      fillColor: '#000',
      fillOpacity: 0,
      strokeColor: color,
      strokeWeight: 3,
      clickable: false,
      visible: true
    }
  })
}
