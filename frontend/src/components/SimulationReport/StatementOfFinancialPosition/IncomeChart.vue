<template>
  <div>
    <canvas ref="MyChart"></canvas>
  </div>
</template>

<script>
import { Chart, registerables } from 'chart.js'
import { useSimulationStore } from '@/stores/simulationStore'

const simulation = useSimulationStore()
const { total_revenue, total_gross_profit, total_operating_profit, total_net_income, revenueList } =
  simulation
Chart.register(...registerables)

console.log('(chart)total_revenue', total_revenue)
console.log('(chart)total_gross_profit', total_gross_profit)
console.log('(chart)total_operating_profit', total_operating_profit)
console.log('(chart)total_net_income', total_net_income)

const generateLabels = () => {
  return ['1년', '2년', '3년']
}

export default {
  data: () => ({
    type: 'line',
    data: {
      labels: generateLabels(),
      datasets: [
        {
          label: '당기순이익',
          data: total_net_income,
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgb(255, 99, 132)', //Utils.transparentize(rgb(255, 99, 132)),
          // fill: '1'
          hidden: true
        },
        {
          label: '영업이익',
          data: total_operating_profit,
          borderColor: 'rgb(255, 159, 64)',
          backgroundColor: 'rgb(255, 159, 64)', //Utils.transparentize(rgb(255, 99, 132)),
          hidden: true
          // fill: '1'
        },
        {
          label: '매출총이익',
          data: total_gross_profit,
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgb(75, 192, 192)', //Utils.transparentize(rgb(255, 99, 132)),
          hidden: true
          // fill: '1'
        },
        {
          label: '매출액',
          data: total_revenue,
          borderColor: 'rgb(153, 102, 255)',
          backgroundColor: 'rgb(153, 102, 255)' //Utils.transparentize(rgb(255, 99, 132)),
          // fill: '1'
        }
      ]
    }
  }),
  mounted() {
    this.createChart()
  },
  methods: {
    createChart() {
      new Chart(this.$refs.MyChart, {
        type: 'line',
        data: this.data,
        options: {
          scales: {
            y: {
              max: (Math.max(total_revenue) + 1000000) / 10000000,
              ticks: {
                stepSize: (Math.max(total_revenue) + Math.min(total_revenue)) / 2 / 10000000,
                fontSize: 12 // 라벨의 폰트 크기를 12px로 설정
              }
            }
          },
          plugins: {
            legend: {
              labels: {
                fontSize: 12 // 라벨의 폰트 크기를 12px로 설정
              }
            },
            filler: {
              propagate: false
            },
            'samples-filler-analyser': {
              target: 'chart-analyser'
            }
            // title: {
            //   display: true,
            //   text: 'Financial Statements'
            // }
          },
          interaction: {
            intersect: false
          }
        }
      })
    }
  }
}
</script>

<style></style>
