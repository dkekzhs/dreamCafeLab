<template>
  <div>
    <canvas ref="MyChart"></canvas>
  </div>
</template>

<script>
import { Chart, registerables } from 'chart.js'
import { useSimulationStore } from '@/stores/simulationStore'
Chart.register(...registerables)

const simulation = useSimulationStore()
const { revenueList } = simulation

const DATA_COUNT = 5
const NUMBER_CFG = { count: DATA_COUNT, min: 0, max: 100 }

const labels = [
  '1-1분기',
  '1-2분기',
  '1-3분기',
  '1-4분기',
  '2-1분기',
  '2-2분기',
  '2-3분기',
  '2-4분기',
  '3-1분기',
  '3-2분기',
  '3-3분기',
  '3-4분기'
]

const salesData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
let index = 0
for (const revenue of revenueList) {
  salesData[Math.floor(index / 3)] += revenue.revenue * 0.0000001
  index++
}
console.log('salesData', salesData)

//-------------------

export default {
  data: () => ({
    type: 'radar',
    data: {
      labels: labels,
      datasets: [
        {
          label: '매출(백만원)',
          data: salesData,
          type: 'line',
          borderColor: 'rgb(255, 99, 100, 0.5)',
          backgroundColor: 'rgb(255, 99, 100, 0.5)'
        },
        {
          label: '편의 시설(개)',
          data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], // 업데이트 필요함
          type: 'bar',
          borderColor: 'rgb(25, 99, 100, 0.5)',
          backgroundColor: 'rgb(25, 99, 100, 0.5)'
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {}
    }
  }),
  mounted() {
    this.createChart()
  },
  methods: {
    createChart() {
      new Chart(this.$refs.MyChart, {
        type: 'bar',
        data: this.data,
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top'
            },
            title: {
              display: true,
              text: 'Chart.js Combined Line/Bar Chart'
            }
          }
        }
      })
    }
  }
}
</script>

<style></style>
