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
const { revenueList, updateLog } = simulation

console.log('(em.chart)revenueList', revenueList)
console.log('updateLog', updateLog)

const employee = (employeeList) => {
  const employee = []
  for (let i = 0; i < employeeList.length; i++) {
    employee.push(employeeList[i].employees)
  }
  console.log('employee', employee)
  return employee
}
const person_cost = (personCostList) => {
  const personCosts = []
  for (let i = 0; i < personCostList.length; i++) {
    personCosts.push(parseInt(personCostList[i].personCost / 100000))
  }
  console.log('personCosts', personCosts)
  return personCosts
}

const labels = [
  '1월',
  '2월',
  '3월',
  '4월',
  '5월',
  '6월',
  '7월',
  '8월',
  '9월',
  '10월',
  '11월',
  '12월'
]

// 인건비 변화 데이터

//-------------------

export default {
  data: () => ({
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: '직원 수',
          data: employee(updateLog),
          borderColor: 'rgb(255, 99, 1, 0.5)',
          backgroundColor: 'rgb(255, 99, 1, 0.5)',
          order: 1
        },
        {
          label: '인건비(십만원)',
          data: person_cost(revenueList),
          borderColor: 'rgb(255, 99, 132, 0.8)',
          backgroundColor: 'rgb(255, 99, 132, 0.5)',
          type: 'line',
          order: 0
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: (ctx) => 'Point Style: ' + ctx.chart.data.datasets[0].pointStyle
        },
        legend: {
          // onClick: newLegendClickHandler
        }
      }
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
            }
          },
          scales: {
            y: {
              max: 20
            }
          }
        }
      })
    }
  }
}
</script>

<style></style>
