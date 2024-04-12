<template>
  <div>
    <div id="echart" style="width: 100%; height: 300px"></div>
    <div v-if="clickedItem" class="clicked-info">
      3년 총 {{ clickedItem.name }} ({{ numberWithCommas(clickedItem.value) }} 원)
    </div>
  </div>
</template>

<script setup>
import * as echarts from 'echarts'
import { onMounted, ref } from 'vue'
import { useSimulationStore } from '@/stores/simulationStore'

const simulation = useSimulationStore()
const {
  updateRevenueList,
  total_person_cost,
  total_rent_cost,
  total_interest_cost,
  total_etc_cost
} = simulation
console.log('total_person_cost', total_person_cost)
console.log('total_rent_cost', total_rent_cost)
console.log('total_interest_cost', total_interest_cost)
console.log('total_etc_cost', total_etc_cost)

const costData = [
  { name: '인건비', value: total_person_cost[0] + total_person_cost[1] + total_person_cost[2] },
  { name: '임대료', value: total_rent_cost[0] + total_rent_cost[1] + total_rent_cost[2] },
  {
    name: '이자비용',
    value: total_interest_cost[0] + total_interest_cost[1] + total_interest_cost[2]
  }
  // { name: '기타', value: total_etc_cost[0] + total_etc_cost[1] + total_etc_cost[2] }
]

// 클릭된 항목을 저장할 변수
const clickedItem = ref(null)

const numberWithCommas = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

onMounted(() => {
  myChart = echarts.init(document.getElementById('echart'))
  myChart.setOption(option)

  // 클릭 이벤트 핸들러 추가
  myChart.on('click', handleClick)
  updateRevenueList()
})

let myChart = null

const option = {
  toolbox: {
    show: true,
    feature: {
      mark: { show: true }
      // dataView: { show: true, readOnly: false },
      // restore: { show: true },
      // saveAsImage: { show: true }
    }
  },
  series: [
    {
      name: 'Nightingale Chart',
      type: 'pie',
      radius: [50, 100], // 반지름 설정
      center: ['50%', '50%'], // 그래프 중심 위치 조정
      roseType: 'area',
      itemStyle: {
        borderRadius: 8
      },
      label: {
        // 라벨 스타일 설정
        fontSize: 16, // 라벨 폰트 크기 설정
        fontWeight: 'bold' // 라벨 폰트 두껍게 설정
      },
      data: costData
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
