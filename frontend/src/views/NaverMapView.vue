<template>
  <!-- 동 선택 -->
  <div class="background">
    <BackHeader class="back-btn" />
    <div class="sg-text fade-in-out" v-show="showText"><span>상권</span>을 선택해주세요</div>
    <div class="select-container">
      <!-- 구 선택 -->
      <q-select
        filled
        v-model="gu"
        :options="guCategories"
        option-label="name"
        option-value="name"
        label="구 선택"
        class="custom-select gu col"
      />
      <q-select
        filled
        v-model="dong"
        :options="dongCategories"
        option-label="name"
        option-value="name"
        label="동 선택"
        class="custom-select dong col"
      />
      <!-- 상권 선택 -->
      <q-select
        filled
        v-model="sang"
        :options="sangCategories"
        option-label="name"
        option-value="name"
        label="상권 선택"
        class="custom-select sang col"
      />
    </div>
  </div>
  <!-- 지도 -->
  <div id="map" class="map-container">
    <img
      v-if="isLoading"
      src="https://dagak.s3.ap-northeast-2.amazonaws.com/cafe/loading.gif"
      class="loading"
    />
    <div class="getLocationWrapper">
      <div class="location-box"></div>
      <img
        src="https://dagak.s3.ap-northeast-2.amazonaws.com/cafe/current.png"
        class="getLocation"
        @click="getCurrentLocation"
        alt="현재 위치 받아오기"
      />
      <span class="getLocationText">내 위치</span>
    </div>
    <!-- 이 상권 분석 결과 보기 버튼 -->
    <div class="toast fade-in-out" v-if="showToast">
      {{ toastMessage }}
    </div>
  </div>

  <!-- Modal Component -->
  <q-dialog v-model="modalType" persistent>
    <q-card style="width: 500px; max-width: 90vw">
      <q-card-section>
        <q-card-actions align="right" class="q-pt-md">
          <div class="modal-sang-name">{{ sang.name }} <span class="sang-gun">상권</span></div>
          <q-btn flat round dense icon="close" color="dark" @click="hideSangInfo" />
        </q-card-actions>
        <div
          class="q-my-md"
          style="font-size: 1rem"
          v-html="districtType.recommendReason?.reason"
        ></div>
        <div
          class="q-my-md"
          style="font-size: 1rem"
          v-html="districtType.recommendReason?.information"
        ></div>
      </q-card-section>
      <q-card-section>
        <div class="q-my-md brand-logo">
          <img
            :src="districtType.cafeLogo"
            alt="카페 로고"
            class="cafe-logo"
            style="width: 50%; height: auto"
          />
        </div>
        <div class="content">
          <div class="q-my-md text-subtitle1" style="font-weight: bold">
            {{ districtType.cafeName }}
          </div>
          <div class="cafeType">{{ districtType.cafeType }}</div>
          <div class="go-wrapper">
            <button
              v-if="districtType.cafeType"
              class="modal-btn"
              @click="completeSelection(districtType.cafeType)"
            >
              <span>자세한 상권 정보 확인 </span>
              <!-- <span>보러 가기</span> -->
            </button>
          </div>
        </div>
      </q-card-section>
      <q-separator />
    </q-card>
  </q-dialog>
</template>

<script setup>
import { nextTick, onMounted, ref, watch } from 'vue'
import { useMapStore } from '@/stores/mapStore'
import { useRouter } from 'vue-router'
import { getMapCafeData } from '@/js/map/mapAxios'
import BackHeader from '@/components/BackHeader.vue'
import { findClosestSang, centerToPloygonDataDong, getCenterToXy } from '@/js/map/mapDistanceUtils'
import {
  newMap,
  getLocation,
  clearFeature,
  setGuCategoriesSetting,
  setDongCategoriesSetting,
  changeMarkerSize
} from '@/js/map/mapUtils'

import { handleAreaClick, handleDongChange, handleGuChange } from '@/js/map/mapHandler.js'

const router = useRouter()
const mapStore = useMapStore() // mapStore카테고리 사용

let map = ref(null)
let geojson = ref([])
let coordinates = ref([])
let gu = ref([])
let dong = ref([])
let sang = ref([])
let guCategories = ref([])
let dongCategories = ref([])
let sangCategories = ref([])
let marker = ref([])

const districtType = ref('')
const modalType = ref(false)

let isClickListenerAdded = false
let locationLoading = ref(false)
let flagTouch = ref(true)

let markerClustering = null
const cafeData = ref(null)
const showText = ref(true)

const showToast = ref(false)
const toastMessage = ref('')
const isLoading = ref(false)

const startY = ref(0)
const endY = ref(0)
const swipeInProgress = ref(false)

watch(gu, async (newGu) => {
  if (newGu.name && !locationLoading.value && flagTouch.value) {
    await handleGuChange(
      map,
      newGu.name,
      dong,
      dongCategories,
      sang,
      sangCategories,
      loadDong,
      mapStore
    )
  }
  flagTouch.value = true
})
watch(dong, async (newDong, oldDong) => {
  if (newDong.name && !locationLoading.value) {
    await handleDongChange(map, newDong.name, sang, loadSang)
  }
})
watch(sang, async (newSang) => {
  if (newSang?.name) {
    const feature = geojson.value.features.find(
      (feature) => feature.properties.TRDAR_CD_N === newSang.name
    )
    if (feature) {
      const event = { feature }
      handleAreaClick(map, event, geojson, mapStore, sang, sangCategories)

      let cafeDistrictData = cafeData.value.filter(
        (district) => district.districtId == feature.properties.TRDAR_CD
      )[0]
      if (cafeDistrictData == undefined) {
        cafeDistrictData = {
          cafeName: '상권 데이터를 수집 중이에요',
          cafeLogo: 'https://dagak.s3.ap-northeast-2.amazonaws.com/cafe/gongsajung.gif'
        }
      }
      districtType.value = cafeDistrictData
      if (!districtType.value.recommendReason?.reason) {
        districtType.value.recommendReason = await convertData(districtType.value.recommendReason)
      }
      console.log(cafeDistrictData, 'tetete')
      console.log('districtType : ', districtType.value)
      modalType.value = true
    }
  }
})
const type = {
  '높은 임대료에 맞는 저가 프랜차이즈 추천': {
    reason: '<b>평균 임대료</b>가 높은 상권이에요.',
    information: '합리적인 가격을 제공해 더 많은 성공기회를 얻을 수 있어요.'
  },
  '높은 임대료에 맞는 프랜차이즈 추천': {
    reason: '<b>평균 임대료</b>가 높은 상권이에요.',
    information: '초기자본이 많다면 고급 프랜차이즈로 경쟁력을 확보할 수 있어요.'
  },
  '모두에게 유명한 프랜차이즈 추천': {
    reason: '<b>유명 프랜차이즈</b>가 많은 상권이에요.',
    information: '모두에게 유명한 프랜차이즈 선택을 추천해요.'
  },
  '번화가에 부담없이 차릴 수 있는 프랜차이즈 추천': {
    reason: '이 상권은 <b>번화가</b>에 위치하고 있어요.',
    information:
      '번화가에 위치한 상권에서는 경쟁이 치열할 수 있으므로 초기 투자 부담이 적은 저비용의 프랜차이즈를 찾아보세요.'
  },
  '번화가에서 이야기할 수 있는 프랜차이즈 추천': {
    reason: '이 상권은 <b>번화가</b>에 위치하고 있어요.',
    information: '앉아서 대화 나누기 좋은 카페를 차리기 적합한 곳이에요.'
  },
  '상주인구를 잡을 수 있는 고급 프랜차이즈 추천': {
    reason: '<b>상주인구</b>가 많은 상권이에요.',
    information: '고급 프랜차이즈를 차린다면, 상주인구를 잡을 수 있어요.'
  },
  '유동인구가 많은 곳에 딱 맞는 프랜차이즈 추천': {
    reason: '<b>유동인구</b>가 많은 상권이에요.',
    information: '신속하고 간편한 서비스를 제공할 수 있는 회전율 높은 프랜차이즈를 추천해요.'
  },
  '인구가 많은 곳에 맞는 프랜차이즈 추천': {
    reason: '<b>인구</b>가 많은 상권이에요.',
    information: '쾌적한 서비스를 제공할 수 있는 프랜차이즈를 추천 드려요.'
  },
  '주거지에서 부담없이 차릴 수 있는 프랜차이즈 추천': {
    reason: '이곳에 <b>거주</b>하는 사람이 많은 상권이에요.',
    information: '얘기할 공간이 있는 프렌차이즈를 추천 드려요.'
  },
  '청년에게 부담없는 프랜차이즈 추천': {
    reason: '<b>청년층</b>이 많이 방문하는 상권이에요.',
    information: '청년층이 금액 부담 없이 방문할 수 있는 프랜차이즈를 추천해요.'
  },
  '청년에게 유명한 프랜차이즈 추천': {
    reason: '<b>청년층</b>이 많이 방문하는 상권이에요.',
    information: '학생들이 주로 이용하는 프랜차이즈를 창업하기 적합한 곳입니다.'
  },
  '한적한 곳에 맞는 고급 프랜차이즈 추천': {
    reason: '비교적 <b>한적한</b> 상권이에요.',
    information: '돋보일 수 있는 고급 프랜차이즈를 추천해요.'
  },
  '활기찬 상권에 맞는 고급 프랜차이즈 추천': {
    reason: '활기찬 상권입니다.',
    information: '돋보일 수 있는 고급 프랜차이즈를 추천해요.'
  }
}
const convertData = async (name) => {
  return type[name]
}

const hideSangInfo = () => {
  modalType.value = !modalType.value
}
function showToastMessage(message) {
  toastMessage.value = message
  showToast.value = true

  // 3초 후에 토스트 메시지를 숨깁니다.
  setTimeout(() => {
    showToast.value = false
  }, 5000)
}
async function initMap(lat, lng, z) {
  map.value = await newMap(lat, lng, z)
  // resizeMap(map)
  naver.maps.Event.addListener(map.value, 'click', async function (e) {
    if (!e.overlay) {
      //변수 플래그
      flagTouch.value = false
      let coord = { lat: e.latlng.y, lng: e.latlng.x }
      let data = await findClosestSang(coord)
      gu.value = { code: data.properties.SIGNGU_CD, name: data.properties.SIGNGU_CD_ }
      mapStore.dongCategories = []
      await mapStore.setDongCategories(data.properties.SIGNGU_CD_)

      dongCategories.value = await mapStore.dongCategories
      let findDong = dongCategories.value.filter((feature) => {
        return feature.name == data.properties.ADSTRD_CD_
      })[0]
      dong.value = { name: findDong.name, code: findDong.code }
      if (districtType.value) {
        districtType.value.cafeType = ''
      }
    }
  })
}
onMounted(async () => {
  const script = document.createElement('script')
  // 네이버 지도 API 로드
  script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${import.meta.env.VITE_CLIENT_NAVER_KEY}`
  script.async = true
  script.defer = true
  document.head.appendChild(script)

  script.onload = async () => {
    await initMap(37.5666805, 126.9784147, 10)

    const clusteringScript = document.createElement('script')
    clusteringScript.src = `${import.meta.env.VITE_MARKER_NAVER_JS}`
    document.head.appendChild(clusteringScript)
    nextTick(async () => {
      await loadGu()
    })
  }
})

async function getCurrentLocation() {
  isLoading.value = true
  flagTouch.value = true
  let location = await getLocation()
  if (typeof location == 'string') {
    isLoading.value = false
    showToastMessage(location)
    return
  }
  coordinates.value = location
  await checkLocation(location)

  isLoading.value = false
}

async function locationToSang(feature) {
  console.log('locationTOSang ', feature)
  isClickListenerAdded = true
  if (!isClickListenerAdded) {
    map.value.data.addListener('click', function (e) {
      handleAreaClick(map, e, geojson, router)
    })
  }
}
//ADSTRD -> DONG,
async function checkLocation(coordinates) {
  if (coordinates) {
    console.log('checkLocation : ', coordinates)
    const featureSang = await findClosestSang(coordinates)

    console.log('141 checkLocation featureSang : ', featureSang)
    const dongName = featureSang.properties.ADSTRD_CD_
    const guName = featureSang.properties.SIGNGU_CD_
    await setGuCategoriesSetting(guName, mapStore, gu, guCategories)
    await setDongCategoriesSetting(guName, dongName, mapStore, dong, dongCategories)
    sang.value = sangCategories.value.filter(
      (sang) => sang.name === featureSang.properties.TRDAR_CD_N
    )[0]
  } else {
    console.log('checkLocation not data')
    loadGu()
  }
}

async function loadGu() {
  await mapStore.setGuCategories()
  guCategories.value = mapStore.guCategories
  // 기존 데이터 삭제
  if (geojson.value) {
    await clearFeature(map, geojson, marker)
  }

  // GeoJson 파일 불러오기
  const response = await fetch(`${import.meta.env.VITE_GU_GEOJSON_PATH}`)
  geojson.value = await response.json()
  // GeoJson 데이터를 지도에 추가
  map.value.data.addGeoJson(geojson.value)

  for (const feature of geojson.value.features) {
    let point = await centerToPloygonDataDong(feature.geometry)
    let guName = feature.properties.SIG_KOR_NM
    let markerData = new naver.maps.Marker({
      position: new naver.maps.LatLng(point.geometry.coordinates[1], point.geometry.coordinates[0]),
      map: map.value,
      icon: {
        content: `<div class="markerBox-gu">
            <p class="markerText-gu">${guName}</p>
            </div>`,
        size: new naver.maps.Size(38, 38),
        anchor: new naver.maps.Point(19, 19)
      },
      userData: {
        featureData: feature
      }
    })
    // 클로저 안에서 feature 변수를 사용하도록 수정
    naver.maps.Event.addListener(markerData, 'click', async function (clickedMarkerData) {
      let markerGuName = feature.properties.SIG_KOR_NM
      let markerGuCode = feature.properties.SIG_CD
      gu.value = { name: markerGuName, code: markerGuCode }
    })
    marker.value.push(markerData)
  }

  map.value.data.setStyle(function (e) {
    return {
      fillColor: 'rgb(17, 135, 207)',
      fillOpacity: 0.3,
      strokeColor: 'rgb(17, 135, 207)',
      strokeStyle: 'solid',
      strokeWeight: 2,
      clickable: true,
      visible: true
    }
  })

  map.value.data.addListener('click', async function (e) {
    const selectdGuName = e.feature.getProperty('SIG_KOR_NM')
    const selectGuCode = e.feature.getProperty('SIG_CD')
    map.value.morph(e.coord, 13)
    gu.value = { name: selectdGuName, code: selectGuCode }
  })
  await initializeMarkerClustering(map.value, marker.value)
}

async function loadDong(guName) {
  await clearFeature(map, geojson, marker)
  await mapStore.setDongCategories(guName)
  dongCategories.value = mapStore.dongCategories

  // 기존 데이터 삭제
  console.log('loadDong Function 입력받은 구이름', guName)
  // GeoJson 파일 불러오기
  const response = await fetch(`${import.meta.env.VITE_DONG_GEOJSON_PATH}`)
  geojson.value = await response.json()
  console.log('loadDong Function 가져온 geojson', geojson.value)
  // 선택된 구에 해당하는 동만 표시
  geojson.value.features = geojson.value.features.filter(
    (feature) => feature.properties.adm_nm.split(' ')[1] === guName
  )
  for (const feature of geojson.value.features) {
    let point = await centerToPloygonDataDong(feature.geometry)
    let markerData = new naver.maps.Marker({
      position: new naver.maps.LatLng(point.geometry.coordinates[1], point.geometry.coordinates[0]),
      map: map.value,
      icon: {
        content: `<div class="markerBox-dong">
            <p class="markerText-dong">${feature.properties.adm_nm.split(' ')[2]}</p>
            </div>`,
        size: new naver.maps.Size(38, 38),
        anchor: new naver.maps.Point(19, 19)
      },
      userData: {
        featureData: feature
      }
    })
    // 클로저 안에서 feature 변수를 사용하도록 수정
    naver.maps.Event.addListener(markerData, 'click', async function (clickedMarkerData) {
      let clickedFeature = geojson.value.features.find(
        (feature) =>
          feature.properties.adm_cd ===
          clickedMarkerData.overlay.userData.featureData.properties.adm_cd
      )
      if (clickedFeature) {
        let markerDongName = feature.properties.adm_nm.split(' ')[2]
        let markerDongCode = feature.properties.adm_cd
        dong.value = { name: markerDongName, code: markerDongCode }
      }
    })
    marker.value.push(markerData)
  }

  // GeoJson 데이터를 지도에 추가
  map.value.data.addGeoJson(geojson.value)
  map.value.data.setStyle(function () {
    return {
      fillColor: 'rgb(255,165,0)',
      fillOpacity: 0.3,
      strokeColor: 'rgb(255,165,0)',
      strokeStyle: 'solid',
      strokeWeight: 2,
      clickable: true,
      visible: true
    }
  })

  map.value.data.addListener('click', function (e) {
    console.log(e.feature.getProperty('adm_nm'))
    const selectedDong = e.feature.getProperty('adm_nm').split(' ')[2]
    const selectedDongCode = e.feature.getProperty('adm_cd')
    map.value.morph(e.coord, 15)
    dong.value = { name: selectedDong, code: selectedDongCode }
  })
  await initializeMarkerClustering(map.value, marker.value)
}

async function loadSang(dongName) {
  await mapStore.setSangCategories(dongName)
  sangCategories.value = mapStore.sangCategories
  console.log('loadSang Function 입력 동이름 :', dong.value.code)
  cafeData.value = await getMapCafeData(dong.value.code)
  // 기존 데이터 삭제
  await clearFeature(map, geojson, marker)

  // GeoJson 파일 불러오기
  const response = await fetch(`${import.meta.env.VITE_SANG_GEOJSON_PATH}`)
  geojson.value = await response.json()

  // 선택된 동에 해당하는 상권만 표시
  geojson.value.features = geojson.value.features.filter(
    (feature) => feature.properties.ADSTRD_CD_ == dongName
  )
  // GeoJson 데이터를 지도에 추가 qwe._raw.geometry
  map.value.data.addGeoJson(geojson.value)
  // 마커를 추가
  for (const feature of geojson.value.features) {
    let x = feature.properties.XCNTS_VALU
    let y = feature.properties.YDNTS_VALU
    let point = await getCenterToXy(x, y)
    let cafeDistrictData = cafeData.value.filter(
      (district) => district.districtId == feature.properties.TRDAR_CD
    )[0]
    if (cafeDistrictData === undefined) {
      cafeDistrictData = {
        cafeName: '상권 데이터를 수집 중이에요',
        cafeLogo: ''
      }
    }
    let markerData = new naver.maps.Marker({
      position: new naver.maps.LatLng(point[1], point[0]),
      map: map.value,
      icon: {
        url: `${cafeDistrictData.cafeLogo}`
      },
      userData: {
        featureData: feature
      }
    })

    // 클로저 안에서 feature 변수를 사용하도록 수정
    naver.maps.Event.addListener(markerData, 'click', async function (clickedMarkerData) {
      let clickedFeature = geojson.value.features.find(
        (feature) =>
          feature.properties.TRDAR_CD ===
          clickedMarkerData.overlay.userData.featureData.properties.TRDAR_CD
      )
      if (clickedFeature) {
        sang.value = {
          name: clickedFeature.properties.TRDAR_CD_N,
          code: clickedFeature.properties.TRDAR_CD
        }
        let cafeDistrictData = cafeData.value.filter(
          (district) => district.districtId == clickedFeature.properties.TRDAR_CD
        )[0]
        if (cafeDistrictData == undefined) {
          cafeDistrictData = {
            cafeName: '상권 데이터를 수집 중이에요',
            cafeLogo: 'https://dagak.s3.ap-northeast-2.amazonaws.com/cafe/gongsajung.gif'
          }
        }
        districtType.value = cafeDistrictData
        console.log('districtType : ', districtType.value)
        modalType.value = true
        await locationToSang(geojson.value)
      }
    })
    marker.value.push(markerData)
    changeMarkerSize(map.value, marker.value)
  }
  await initializeMarkerClustering(map.value, marker.value)

  map.value.data.setStyle(function () {
    return {
      fillColor: 'rgb(60 179 113)',
      fillOpacity: 0.3,
      strokeColor: 'rgb(60 179 113)',
      strokeStyle: 'solid',
      strokeWeight: 2,
      clickable: true,
      visible: true
    }
  })
  naver.maps.Event.addListener(map.value, 'zoom_changed', function () {
    changeMarkerSize(map.value, marker.value)
  })
  map.value.data.addListener('click', async function (e) {
    let feature = e.feature._raw
    sang.value = {
      name: feature.properties.TRDAR_CD_N,
      code: feature.properties.TRDAR_CD
    }
    await locationToSang(geojson.value) // code TRDAR_CD ,  name = TRDAR_CD_N;
  })
}

async function initializeMarkerClustering(map, markers) {
  const markerCluster = {
    content:
      '<div style="cursor:pointer;width:80px;height:80px;display:flex;justify-content:center;align-items:center;font-size:18px;color:white;text-align:center;font-weight:bold;background:url(https://superstorefinder.net/support/wp-content/uploads/2015/07/m1.png);background-size:contain;"></div>',
    size: N.Size(84, 84),
    anchor: N.Point(42, 42)
  }
  if (markerClustering) {
    markerClustering.setMap(null) // 클러스터링을 제거하는 메서드를 호출합니다.
  }

  markerClustering = new MarkerClustering({
    minClusterSize: 2,
    maxZoom: 18,
    map: map,
    markers: markers,
    disableClickZoom: false,
    gridSize: 120,
    icons: [markerCluster],
    indexGenerator: [10],
    stylingFunction: function (clusterMarker, count) {
      const element = clusterMarker.getElement()
      element.querySelector('div:first-child').textContent = count
    }
  })

  return markerClustering
}

function completeSelection(cafeType) {
  if (Array.isArray(sang.value) && sang.value.length === 0) {
    return
  }
  if (cafeType == undefined) {
    return
  }
  router.push({ name: 'card', params: { code: sang.value.code } })
}
</script>
<style>
/* 기존 인라인 스타일을 클래스로 변환 */
.map-container {
  position: relative;
}

.select-container {
  display: flex;
  justify-content: space-between;
  top: 8%;
  width: 100%;
}

.custom-select {
  z-index: 100;
  width: 30%;
}

.custom-select.dong {
  width: 30%;
}

.custom-select.gu {
  width: 30%;
}

.custom-select.sang {
  width: 30%;
}

.next-btn span {
  margin-top: 10%;
  display: block;
  font-size: 1.2rem;
}
.text-subtitle1 {
  font-size: 1.3rem;
  margin: 0;
}
/* h1 태그 애니메이션 */
.fade-in-out {
  z-index: 100;
  left: 20%;
  top: 20%;
  animation: fadeInOut 3s forwards;
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
@keyframes arrow-blink {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.sg-text-comp {
  margin-top: 10%;
}
.sg-text span {
  color: rgb(139, 84, 60);
}
.sg-text {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-size: 30px;
  color: #000000;
  margin-top: 3%;
}
.next-btn {
  position: absolute;
  width: 100%;
  height: 10%;
  transition: height 0.3s ease-out;
  border-radius: 10px;
  text-align: center;
  background-color: rgb(217, 204, 189);
  left: 0px !important;
  bottom: 0px !important;
}

#map {
  height: 88svh !important;
  width: 100% !important; /* 뷰포트 높이의 100% */
}
.markerBox-dong {
  background-color: rgb(75, 60, 31); /* Semi-transparent black background */
  border-radius: 3px; /* Slightly rounded corners */
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.2); /* More pronounced shadow for depth */
  padding: 2px 5px 0 5px; /* Reduced padding at the bottom */
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

/*
  select bar 디자인 구성
*/
.select-group {
  width: 100%;
  display: flex;
  border: 1px solid #e0e0e0;
  background-color: #f5f5f5;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.background {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  background-color: #f5f5f5;
  width: 100%;
  height: 10%;
}

.custom-select .q-field__control {
  background: #f5f5f5;
  height: auto; /* 높이 자동 조정 */
  max-height: 36px; /* 최대 높이 설정 */
}

.custom-select .q-field__control:hover {
  border: 1px solid black;
}

.custom-select .q-select__dropdown-icon {
  color: black;
}

.custom-select .q-item--clickable:hover {
  background-color: black;
}
.custom-label {
  font-size: 12px; /* 라벨 글자 크기 조정 */
}

.custom-select {
  white-space: nowrap;
  overflow: hidden; /* 내용이 넘칠 경우 숨김 */
  text-overflow: ellipsis; /* 텍스트가 오버플로우 될 때 생략 부호로 표시 */
  height: auto; /* select 높이 설정 */
  line-height: normal; /* 줄 높이 설정으로 세로 정렬 */
}

.getLocation {
  position: absolute;
  z-index: 100;
  left: 80%;
  top: 70%;
  width: 10%;
}
.getLocationText {
  position: absolute;
  z-index: 101;
  left: 80%;
  top: 75%;
  width: 20%;
}
.location-box {
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
.loading {
  position: absolute;
  z-index: 100;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30%;
}
.toast {
  width: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  letter-spacing: -3px;
  z-index: 100;
  font-size: large;
  left: 20%;
  top: 30%;
}

.go-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
}
.modal-sang-name {
  flex: 1px;
  font-size: 1.6rem;
  font-weight: bold;
  margin-bottom: 10px;
  color: rgb(139, 84, 60);
}
.modal-btn {
  width: 70%;
  height: 50%;
  padding-top: 5%;
  padding-bottom: 5%;
  font-size: medium;
  background-color: antiquewhite;
  align-content: center;
  font-size: 1rem;
  border-radius: 30px; /* 둥근 모서리 반경 설정 */
  border: none; /* 테두리 없음 */
  cursor: pointer; /* 포인터 커서 설정 */
  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.12),
    0 1px 2px rgba(0, 0, 0, 0.24);
}
.back-btn {
  margin: 3%;
  width: 15%;
  border: none;
  border-radius: 5px;
  z-index: 100;
}
.getLocationText {
  font-weight: bolder;
}
.sang-gun {
  font-size: 1.1rem;
  color: #000000;
}
.brand-logo {
  display: flex;
  justify-content: center;
  align-items: center;
}
.cafe-logo {
  width: 50%;
  height: auto;
}
.content {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.cafeType {
  margin-top: 2%;
  margin-bottom: 15%;
  font-size: 1rem;
}
</style>
