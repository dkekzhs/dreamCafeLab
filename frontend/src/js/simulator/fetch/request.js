import { useSimulationStore } from '@/stores/simulationStore'

let baseUrl = import.meta.env.VITE_APP_BACKEND_URL
const simulationStore = useSimulationStore()

function requestInitialSimul(jsonData) {
  fetch(baseUrl + '/simulation/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(jsonData) // JSON 데이터를 문자열로 변환하여 요청 본문에 담음
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('네트워크 에러')
      }

      return response.json() // 서버로부터의 JSON 응답 해석
    })
    .then((data) => {
      console.log('서버로부터의 응답:', data)

      // simulationStore에 저장
      simulationStore.setUuid(data.result.uuid)
      simulationStore.setInitPrice(data.result.initPrice)
      simulationStore.setSelectBrand(data.result.selectBrand)
      simulationStore.setFacilityList(data.result.facilityList.facility)
      simulationStore.setInput(data.result.input)
      simulationStore.setFacilityTypeList(data.result.facilityTypeList)
      simulationStore.setFacilityType(data.result.facilityList.facilityType)
      simulationStore.setLocation([data.result.input.lng, data.result.input.lat])

      simulationStore.setRevenueList(data.result.revenueList)
      simulationStore.setBeforeRevenueList(data.result.revenueList)
      simulationStore.setLatestRevenueList(data.result.revenueList)
      //  clearData()
    })
    .catch((error) => {
      console.error('에러 발생:', error)
    })
}

function requestUpdateSimul(jsonData) {
  fetch(baseUrl + '/simulation/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(jsonData) // JSON 데이터를 문자열로 변환하여 요청 본문에 담음
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('네트워크 에러')
      }
      return response.json() // 서버로부터의 JSON 응답 해석
    })
    .then((data) => {
      console.log('서버로부터의 응답:', data)

      // simulationStore에 저장
      simulationStore.setUuid(data.result.uuid)
      simulationStore.setInitPrice(data.result.initPrice)
      simulationStore.setSelectBrand(data.result.selectBrand)
      // simulationStore.setFacilityList(data.result.facilityList.facility)
      simulationStore.setInput(data.result.input)
      simulationStore.setFacilityTypeList(data.result.facilityTypeList)
      simulationStore.setFacilityType(data.result.facilityList.facilityType)
      simulationStore.setLocation([data.result.input.lng, data.result.input.lat])

      // 현재 progress 이후부터의 revenue 값만 덮어씌우기
      let progress = window.simulate.game.ui.month
      let existRevenueList = simulationStore.revenueList
      console.log(existRevenueList)
      console.log(data.result.revenueList)
      // splice() 메서드를 사용하여 해당 부분을 잘라내고, 그 자리에 다른 배열을 넣습니다.
      existRevenueList.splice(
        progress + 1,
        existRevenueList.length - (progress + 1),
        ...data.result.revenueList.slice(progress + 1)
      )
      console.log("after : progress "+progress)
      console.log(existRevenueList)
      simulationStore.setRevenueList(existRevenueList)

      // 현재의 latestRevenueList를 beforeRevenueList로 덮어씌우기
      simulationStore.setBeforeRevenueList(simulationStore.latestRevenueList)

      // 새롭게 받아온 revenueList를 latestRevenueList에 저장하기
      simulationStore.setLatestRevenueList(data.result.revenueList)
      //  clearData()
    })
    .catch((error) => {
      console.error('에러 발생:', error)
    })
}

export { requestInitialSimul, requestUpdateSimul }

var testJson1 = {
  lat: 37.4940221,
  lng: 126.8938625,
  radius: 10,
  initialPrice: 30000000,
  interestRate: 3.2,
  employees: 3,
  brandId: 1,
  cafeSize: 20,
  startTime: '2024-03-24T12:34:56.789Z'
}
var testJson2 = {
  uuid: 'f3912dcc-1c16-4c57-af0d-98a7ba675ede',
  employees: 4,
  progress: 6,
  removeFacility: [22182],
  addFacility: [{ facilityId: 100000, distance: 100, facilityTypeId: 1 }]
}
