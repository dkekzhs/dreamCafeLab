<template>
  <div>
    <canvas ref="MyChart"></canvas>
  </div>
</template>

<script>
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

const DATA_COUNT = 5
const NUMBER_CFG = { count: DATA_COUNT, min: 0, max: 100 }

const labels = [
  '관공서',
  '약국',
  '은행',
  '대학교',
  '병원',
  '소극장',
  '영화관',
  '학교',
  '숙박업소',
  '지하철역',
  '버스정류장',
  '아파트단지수'
]

const generateData = () => [1, 2, 3, 4, 5, 2, 5, 1, 4, 5, 1, 5]

//-------------------

export default {
  data: () => ({
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          // label: '가게 비용',
          data: generateData(),
          backgroundColor: [
            'rgb(25, 99, 100, 0.5)',
            'rgb(255, 99, 20, 0.5)',
            'rgb(200, 99, 300, 0.5)',
            'rgb(20, 99, 300, 0.5)',
            'rgb(265, 99, 300, 0.5)',
            'rgb(255, 2, 300, 0.5)',
            'rgb(255, 99, 300, 0.5)',
            'rgb(255, 99, 300, 0.5)',
            'rgb(2, 99, 300, 0.5)',
            'rgb(255, 99, 300, 0.5)',
            'rgb(255, 99, 300, 0.5)',
            'rgb(255, 99, 300, 0.5)'
          ],
          borderColor: 'rgb(255, 255, 255, 0.2)'
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
        type: 'polarArea',
        data: this.data,
        options: {
          responsive: true,
          scales: {
            r: {
              max: Math.max(...generateData()) + 1,
              ticks: {
                stepSize: 1
              },
              pointLabels: {
                display: true,
                // centerPointLabels: true,
                font: {
                  size: 13
                }
              }
            }
          },
          plugins: {
            legend: {
              position: 'none'
            }
          }
        }
      })
    }
  }
}
</script>

<style></style>
