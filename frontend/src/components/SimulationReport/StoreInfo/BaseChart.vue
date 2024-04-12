<template>
  <div>
    <canvas ref="MyChart"></canvas>
  </div>
</template>

<script>
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

const newLegendClickHandler = function (e, legendItem, legend) {
  const index = legendItem.datasetIndex
  const type = legend.chart.config.type

  if (index > 1) {
    // Do the original logic
    if (type === 'pie' || type === 'doughnut') {
      pieDoughnutLegendClickHandler(e, legendItem, legend)
    } else {
      defaultLegendClickHandler(e, legendItem, legend)
    }
  } else {
    let ci = legend.chart
    ;[ci.getDatasetMeta(0), ci.getDatasetMeta(1)].forEach(function (meta) {
      meta.hidden = meta.hidden === null ? !ci.data.datasets[index].hidden : null
    })
    ci.update()
  }
}

const inputs = {
  min: 20,
  max: 80,
  count: 8,
  decimals: 2,
  continuity: 1
}

const generateLabels = () => {
  return [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]
}

const generateData = () => [1, 1, 110, 1, 1, 1, 11, 1, 1, 100, 1, 100]

//-------------------

export default {
  data: () => ({
    type: 'line',
    data: {
      labels: generateLabels(),
      datasets: [
        {
          label: '매출',
          data: generateData(),
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgb(255, 99, 132)', //Utils.transparentize(rgb(255, 99, 132)),
          hidden: true
        },
        {
          label: '인건비',
          data: generateData(),
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgb(255, 99, 132)', //Utils.transparentize(rgb(255, 99, 132)),
          fill: '-1'
        },
        {
          label: '원재료비',
          data: generateData(),
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgb(255, 99, 132)', //Utils.transparentize(rgb(255, 99, 132)),
          hidden: true,
          fill: 1
        },
        {
          label: '기타비용',
          data: generateData(),
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgb(255, 99, 132)', //Utils.transparentize(rgb(255, 99, 132)),
          fill: '-1'
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
          onClick: newLegendClickHandler
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
        type: 'line',
        data: this.data,
        options: {
          scales: {
            y: {
              stacked: true
            }
          },
          plugins: {
            filler: {
              propagate: false
            },
            'samples-filler-analyser': {
              target: 'chart-analyser'
            }
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
