<template>
  <div>
    <input type="text" v-model="lat" placeholder="Enter lat" />
    <input type="text" v-model="lng" placeholder="Enter lng" />
    <button @click="geocodeAddress">[Geocode]</button>
    <div v-if="address">
      <p>address: {{ address }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
const lat = ref(0)
const lng = ref(0)
const address = ref('')

onMounted(async () => {
  const script = document.createElement('script')
  // 네이버 지도 API 로드
  //   script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${import.meta.env.VITE_CLIENT_NAVER_KEY}`
  script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${import.meta.env.VITE_CLIENT_NAVER_KEY}&submodules=geocoder`
  script.async = true
  script.defer = true
  document.head.appendChild(script)

  script.onload = async () => {
    // await initMap(37.5666805, 126.9784147, 10)
    lat.value = 37.5666805
    lng.value = 126.9784147

    console.log('geocodeAddress')
    naver.maps.Service.reverseGeocode(
      {
        coords: new naver.maps.LatLng(37.3595316, 127.1052133)
      },
      function (status, response) {
        if (status !== naver.maps.Service.Status.OK) {
          return alert('Something wrong!')
        }

        var result = response.v2, // 검색 결과의 컨테이너
          items = result.results, // 검색 결과의 배열
          address = result.address // 검색 결과로 만든 주소
        alert('Coordinates: ' + address.value)
        // do Something
      }
    )
  }
})

const geocodeAddress = function () {
  console.log('geocodeAddress')
  naver.maps.Service.reverseGeocode(
    {
      coords: new naver.maps.LatLng(lat, lng)
    },
    function (status, response) {
      if (status !== naver.maps.Service.Status.OK) {
        return alert('Something wrong!')
      }

      var result = response.v2, // 검색 결과의 컨테이너
        items = result.results, // 검색 결과의 배열
        address = result.address // 검색 결과로 만든 주소
      alert('Coordinates: ' + result)
      // do Something
    }
  )
}
</script>
