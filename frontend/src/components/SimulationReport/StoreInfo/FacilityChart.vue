<template>
  <div>
    <div id="echart" style="width: 100%; height: 300px"></div>
    <div v-if="clickedItem" class="clicked-info">
      {{ clickedItem.name }} ({{ clickedItem.value }} 개)
    </div>
  </div>
</template>

<script setup>
import * as echarts from 'echarts'
import { onMounted, ref } from 'vue'
import { useSimulationStore } from '@/stores/simulationStore'

const simulation = useSimulationStore()
const { facilityList, facilityType } = simulation

const typeData = facilityType.map((type) => {
  return { name: type.facilityTypeName, value: 0 }
})

facilityList.forEach((facility) => {
  const typeId = facility.facilityTypeId
  if (typeData[typeId]) {
    typeData[typeId].value++
  }
})

// 없는 편의시설 제거
typeData.forEach((data, index) => {
  if (data.value === 0) {
    typeData.splice(index, 1)
  }
})

console.log('facility data', typeData)

// 클릭된 항목을 저장할 변수
const clickedItem = ref(null)

onMounted(() => {
  myChart = echarts.init(document.getElementById('echart'))
  myChart.setOption(option)

  // 클릭 이벤트 핸들러 추가
  myChart.on('click', handleClick)
})

let myChart = null

const option = {
  toolbox: {
    show: true,
    feature: {
      mark: { show: true },
      dataView: { show: true, readOnly: false },
      restore: { show: true },
      saveAsImage: { show: true }
    }
  },
  series: [
    {
      name: 'Nightingale Chart',
      type: 'pie',
      radius: [20, 100], // 반지름 설정
      center: ['50%', '50%'], // 그래프 중심 위치 조정
      roseType: 'area',
      label: {
        // 라벨 스타일 설정
        fontSize: 12, // 라벨 폰트 크기 설정
        fontWeight: 'bold' // 라벨 폰트 두껍게 설정
      },
      itemStyle: {
        borderRadius: 8
      },
      data: typeData
    }
  ]
}

// 클릭 이벤트 핸들러
function handleClick(params) {
  // 클릭된 요소의 이름(name)과 값을 clickedItem 변수에 저장
  clickedItem.value = { name: params.name, value: params.value }
}
</script>

<style>
.clicked-info {
  margin-bottom: 10px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  font-size: 15px;
}
</style>
