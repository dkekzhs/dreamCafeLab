<template>
  <div class="simulationCard">
    <BackHeader class="sim-back-btn" />
    <div class="simul-text-comp fade-in-out">
      <div class="simul-text">창업할 <span>위치</span>를 선택하세요.</div>
    </div>
  </div>

  <div id="map" class="map-container">
    <div class="map-item">
      <!-- 토스트 메시지를 표시할 요소 -->
      <div class="toast fade-in-out2" v-if="showToast">
        {{ toastMessage }}
      </div>
      <img
        v-if="isLoading"
        src="https://dagak.s3.ap-northeast-2.amazonaws.com/cafe/loading.gif"
        class="loading"
      />
      <div class="sim-getLocationWrapper">
        <div class="sim-location-box"></div>
        <img
          src="https://dagak.s3.ap-northeast-2.amazonaws.com/cafe/current.png"
          class="sim-getLocation"
          @click="getCurrentLocation"
          alt="현재 위치 받아오기"
        />
        <span class="sim-getLocationText">내 위치</span>
      </div>

      <div class="address">{{ addressRef }}</div>
      <button v-if="marker" @click="markComplete" class="sim-next-btn">창업하기</button>
    </div>
  </div>
</template>

<script setup>
import { newMap, areaSiSetting, clearFeature } from '@/js/map/mapUtils'
import { ref, onMounted, watch, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import {
  isPointInsidePolygon,
  centerToPloygonData,
  centerToPloygonDataDong
} from '@/js/map/mapDistanceUtils'
import { getLocation } from '@/js/map/mapUtils'
import { useDataStore } from '@/stores/dataStore'
import BackHeader from '@/components/BackHeader.vue'

const dataStore = useDataStore()
const routerPage = useRouter()
const map = ref(null)
const marker = ref(null)
const clickListener = ref(null)
const circle = ref(null)
const radius = ref(500) // 1000미터 고정
const borderArea = ref(null)
const coordinates = ref(null)
const addressRef = ref('')
const currentZoomLevel = ref(10)

const showToast = ref(false)
const toastMessage = ref('')
const isLoading = ref(false)

const markers = ref([])
const geojson = ref([])
const gu = ref([])
const dong = ref([])
let markerClustering = null

watch(currentZoomLevel, (newVal) => {
  if (newVal >= 15) currentZoomLevel.value = 14
})

watch(coordinates, async (newVal, oldVal) => {
  if (newVal) {
    console.log(newVal)
    map.value.morph(new naver.maps.LatLng(newVal[1], newVal[0]), currentZoomLevel.value + 3)
  }
})

onMounted(async () => {
  const script = document.createElement('script')
  // 네이버 지도 API 로드
  script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${import.meta.env.VITE_CLIENT_NAVER_KEY}`
  script.async = true
  script.defer = true
  document.head.appendChild(script)
  script.onload = async () => {
    const geoScript = document.createElement('script')
    geoScript.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${import.meta.env.VITE_CLIENT_NAVER_KEY}&submodules=geocoder`
    document.head.appendChild(geoScript)
    const clusteringScript = document.createElement('script')
    clusteringScript.src = `${import.meta.env.VITE_MARKER_NAVER_JS}`
    document.head.appendChild(clusteringScript)

    await initMap(37.5666805, 126.9784147, 10)
    await settingMap()
    coordinates.value = dataStore.location
    coordinates.value = await getLocation()
  }
})

async function initMap(lat, lng, z) {
  map.value = await newMap(lat, lng, z)

  // 지도 클릭 이벤트
  clickListener.value = naver.maps.Event.addListener(map.value, 'click', async function (e) {
    const clickCoord = e.coord
    let lat = clickCoord.y
    let lng = clickCoord.x

    // 폴리곤 내부 클릭인지 확인
    if (currentZoomLevel.value <= 13) {
      let address = [lng, lat]
      getAddress(address)
      coordinates.value = [lng, lat]
      return
    }
    if (isPointInsidePolygon(borderArea.value, [lng, lat])) {
      if (marker.value) {
        // 이미 마커가 있는 경우 마커 위치를 클릭한 위치로 업데이트
        marker.value.setPosition(clickCoord)
      } else {
        // 마커 생성
        marker.value = new naver.maps.Marker({
          position: clickCoord,
          map: map.value
        })
      }
      coordinates.value = [lng, lat]
      getAddress(coordinates.value)
      dataStore.setLocation(coordinates.value)
      updateCircle()
    } else {
      showToastMessage('폴리곤 영역 내에서 선택해주세요.')
    }
  })
  naver.maps.Event.addListener(map.value, 'zoom_changed', () => {
    // 현재 줌 레벨을 가져옵니다.
    currentZoomLevel.value = map.value.getZoom()
  })
}
function showToastMessage(message) {
  toastMessage.value = message
  showToast.value = true
}

async function getCurrentLocation() {
  isLoading.value = true
  let location = await getLocation()
  if (typeof location == 'string') {
    isLoading.value = false
    showToastMessage(location)
    return
  }

  coordinates.value = [location.lng, location.lat]
  isLoading.value = false
}

function markComplete() {
  if (marker.value) {
    console.log('marker : ', marker.value)

    // 주소 정보 저장
    naver.maps.Service.reverseGeocode(
      {
        coords: new naver.maps.LatLng(coordinates.value[1], coordinates.value[0])
      },
      function (status, response) {
        if (status !== naver.maps.Service.Status.OK) {
          return alert('위도 경도 좌표에 대한 주소를 찾을 수 없습니다.')
        }

        var result = response.v2, // 검색 결과의 컨테이너
          items = result.results, // 검색 결과의 배열
          address = result.address // 검색 결과로 만든 주소

        // alert(address.jibunAddress)
        dataStore.setAddress(address.jibunAddress.trim())
      }
    )

    naver.maps.Event.removeListener(clickListener.value)

    routerPage.push({ name: 'simulation_brand' })
  } else {
    alert('좌표를 선택해주세요.')
  }
}

function updateCircle() {
  if (marker.value) {
    const position = marker.value.getPosition()
    const circleOptions = {
      map: map.value,
      center: position,
      radius: radius.value, // 반경 설정 (미터 단위)
      fillColor: 'rgb(137 178 233)',
      fillOpacity: 0.5,
      strokeColor: 'rgb(137 178 233)'
    }

    if (circle.value) {
      // 이미 원이 있으면 업데이트
      circle.value.setOptions(circleOptions)
    } else {
      // 원 생성
      circle.value = new naver.maps.Circle(circleOptions)
    }
  }
}
async function getAddress(data) {
  console.log(data)
  naver.maps.Service.reverseGeocode(
    {
      coords: new naver.maps.LatLng(data[1], data[0])
    },
    function (status, response) {
      if (status !== naver.maps.Service.Status.OK) {
        showToastMessage('도로명 주소를 가져올 수 없습니다.')
      }

      var result = response.v2, // 검색 결과의 컨테이너
        address = result.address.jibunAddress // 검색 결과로 만든 주소
      addressRef.value = address
    }
  )
}
async function settingMap() {
  // URL에서 code 값 읽기
  console.log('기본 폴리곤 정보를 가져와서 보여줌')
  await areaSiSetting(borderArea, map)
}
</script>

<style scoped>
.simulationCard {
  display: flex;
  flex-direction: row;
  background-color: #fff;
  height: 70px;
}
.map-container {
  position: relative;
  z-index: 1;
}

.simul-text-comp {
  width: auto;
  align-items: flex-start;
  letter-spacing: -3px;
  margin-top: 2%;
}
.simul-text span {
  color: rgb(139, 84, 60);
}
.simul-text {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-size: 28px;
  color: #000000;
  margin-top: 2%;
}
.sim-next-btn {
  position: absolute;
  font-family: 'Inter';
  font-weight: 1000;
  background-color: rgb(217, 204, 189) !important;
  border-radius: 10px;
  z-index: 100;
  width: 80%;
  height: 5%;
  bottom: 100px;
  left: 10%;
}
.fade-in-out {
  z-index: 100;
  animation: fadeInOut2 5s forwards;
}

.sim-getLocation {
  position: absolute;
  z-index: 100;
  left: 80%;
  top: 70%;
  width: 10%;
}
.loading {
  position: absolute;
  z-index: 100;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30%;
}
.address {
  position: absolute;
  z-index: 100;
  left: 27%;
  top: 80%;
  width: 80%;
  font-size: large;
  font-weight: bolder;
}

#map {
  height: 92.3svh !important;
  width: 100% !important; /* 뷰포트 높이의 100% */
}

@keyframes fadeInOut {
  0% {
    opacity: 0;
  }
  20% {
    opacity: 1;
  }
  80% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
@keyframes fadeInOut2 {
  0% {
    opacity: 0;
  }
  20% {
    opacity: 1;
  }
  80% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
/* 토스트 메시지의 스타일 */
.toast {
  width: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  letter-spacing: -3px;
  z-index: 100px;
  font-size: large;
  left: 20%;
  top: 30%;
}

.markerText-dong {
  font-size: 0.85rem; /* Smaller font size */
  font-weight: 500; /* Semi-bold text */
  color: #fff; /* White text color for contrast */
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5); /* Text shadow for better readability */
}
.markerBox-gu {
  background-color: rgb(46, 108, 118); /* Semi-transparent black background */
  border-radius: 3px; /* Slightly rounded corners */
  box-shadow: 0 0 10px rgba(185, 86, 86, 0.2); /* More pronounced shadow for depth */
  padding: 2px 5px 0 5px; /* Reduced padding at the bottom */
}

.markerText-gu {
  font-size: 0.85rem; /* Smaller font size */
  font-weight: 500; /* Semi-bold text */
  color: #fff; /* White text color for contrast */
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5); /* Text shadow for better readability */
}
.sim-location-box {
  position: absolute;
  z-index: 100;
  left: 76%;
  top: 69%;
  width: 75px;
  height: 75px;
  background-color: white;
  border-radius: 35px; /* 버튼 모서리 둥글게 */
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.3); /* 그림자 효과 */
  transition: all 0.3s ease 0s; /* 부드러운 전환 효과 */
  cursor: pointer; /* 마우스 커서를 손가락 모양으로 변경 */
  outline: none; /* 클릭 시 테두리 강조 제거 */
}
.sim-getLocationText {
  position: absolute;
  z-index: 101;
  left: 80%;
  top: 75%;
  width: 20%;
  font-weight: bolder;
}
.sim-back-btn {
  margin: 3%;
  width: 15%;
  border: none;
  border-radius: 5px;
  z-index: 100;
}
</style>
