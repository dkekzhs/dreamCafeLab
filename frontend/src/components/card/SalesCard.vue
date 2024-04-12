<template>
  <div class="q-pa-md">
    <div class="card-design" :class="{ flipped: isVisible }">
      <div class="card front">
        <div id="main sales" style="width: 100%; height: 300px" ref="effectiveChartDom"></div>
        <div class="card-report-text">
          <div class="main-text">월세 걱정이 {{ isWorry }} !</div>
        </div>
        <div class="card-img-comp-sale">
          <img class="testtest" v-if="!isVisible" :src="isWorryImage" :ref="catMotion" />
        </div>
      </div>

      <div class="card back detail-design">
        <div id="sub sales" ref="compareChartDom" style="width: 100%; height: 200px"></div>
        <div class="card-report-title">분석 내용</div>
        <div class="card-report-text">
          <div class="report-text-par">
            카페 매출의 <span class="per">10%</span>를 임대료로 잡는게 좋아요.
          </div>
          <div>10평 기준의 카페와 비교해봤을 때,</div>
          <div class="report-text-par">
            임대료 대비 매출 효과가
            <span class="per">{{ costEffectiveness.toFixed(2) }}%</span> 나오네요.
          </div>
        </div>
        <div class="card-sub-text-comp">
          <div class="card-sub-text">※ 카페 평 수는 <span>10평</span> 기준으로 계산했습니다.</div>
          <div class="card-sub-text">※ cost: 매출 * 0.1 / (면적 * 1평 당 임대료)</div>
        </div>
      </div>
    </div>
    <button class="detail-btn" @click="toggleVisibility">
      <img src="../../assets/img/total/detail-btn.png" />
      {{ !isVisible ? '분석 보기' : '돌아 가기' }}
    </button>
  </div>
</template>

<script setup>
import { ref, nextTick, onMounted, watchEffect } from 'vue'
import * as echarts from 'echarts'
const { type, data } = defineProps({
  type: {
    type: String,
    required: true
  },
  data: {
    type: Object,
    required: true
  }
})

const { cafes, cafeSales, deposit, rentFee, rentSpec } = data
const numberWithCommas = (number) => {
  // if(number.length)
  console.log(number.length)
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
const effectiveChartDom = ref(null)
const compareChartDom = ref(null)
let myChart = null
const isVisible = ref(false)
const isWorry = ref('')
const isWorryImage = ref('/src/assets/img/card/sale-card/sales-happy-cat2.gif')
const costEffectiveness = ref(data.costEffectiveness)
watchEffect(() => {
  if (costEffectiveness.value <= 100) {
    isWorry.value = '있겠어요.'
    isWorryImage.value = '/src/assets/img/card/sale-card/sales-crying-cat.gif'
  } else {
    console.log(12)
    isWorry.value = '없겠어요'
  }
})

const comparisonCalOptin = {
  title: {
    text: '임대료 보고서',
    subtext: '카페 매출 임대료 비교',
    left: 'center',
    top: 0,
    textStyle: {
      fontSize: '30px',
      color: 'black',
      fontWeight: 'bold'
    },
    subtextStyle: {
      fontWeight: 'bold',
      fontSize: 13,
      color: '#666'
    }
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      // Use axis to trigger tooltip
      type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
    }
  },
  legend: {
    bottom: -5,
    textStyle: {
      fontSize: 20
    }
  },
  grid: {
    left: '1%',
    right: '1%',
    top: '30%', // 위 여백 설정
    bottom: '10%', // 아래 여백 설정
    containLabel: true
  },
  xAxis: {
    type: 'value',
    splitLine: {
      // x축에 데이터 구분선 추가
      show: true,
      lineStyle: {
        type: 'dashed' // 점선 스타일로 설정
      }
    },
    axisLabel: {
      // x축 레이블 숨기기
      show: false
    }
  },
  yAxis: {
    type: 'category',
    data: [''], // y축 데이터 비워두기
    axisLabel: {
      // y축 레이블 숨기기
      show: false
    }
  },
  series: [
    {
      name: '10% 매출',
      type: 'bar',
      stack: 'total',
      label: {
        show: true
      },
      emphasis: {
        focus: 'series'
      },
      data: [parseInt(cafeSales * 0.1)]
    },
    {
      name: '임대료',
      type: 'bar',
      stack: 'total',
      label: {
        show: true
      },
      emphasis: {
        focus: 'series'
      },
      data: [parseInt((rentFee / rentSpec) * 10)]
    }
  ]
}

const costEffectiveOption = {
  title: {
    text: '임대료 효율 등급',
    left: 'center',
    top: 0,
    textStyle: {
      fontSize: '30px',
      color: 'black',
      fontWeight: 'bold'
    }
  },
  series: [
    {
      type: 'gauge',
      startAngle: 180,
      endAngle: 0,
      center: ['50%', '75%'],
      radius: '90%',
      min: 0,
      max: 1,
      splitNumber: 10, // 등급을 5개로 나눠줍니다.
      axisLine: {
        lineStyle: {
          width: 6,
          color: [
            [0.2, '#FF0000'], // 등급 1: 빨간색
            [0.4, '#FFA500'], // 등급 2: 주황색
            [0.6, '#FFFF00'], // 등급 3: 노란색
            [0.8, '#32CD32'], // 등급 4: 연두색
            [1, '#008000'] // 등급 5: 초록색
          ]
        }
      },
      pointer: {
        icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
        length: '12%',
        width: 20,
        offsetCenter: [0, '-60%'],
        itemStyle: {
          color: 'auto'
        }
      },
      axisTick: {
        length: 5,
        lineStyle: {
          color: 'auto',
          width: 2
        }
      },
      splitLine: {
        length: 10,
        lineStyle: {
          color: 'auto',
          width: 5
        }
      },
      axisLabel: {
        color: '#464646',
        fontSize: 20,
        distance: -40,
        rotate: 'tangential',
        formatter: function (value) {
          if (value === 0.1) {
            return '5'
          } else if (value === 0.3) {
            return '4'
          } else if (value === 0.5) {
            return '3'
          } else if (value === 0.7) {
            return '2'
          } else if (value === 0.9) {
            return '1'
          }
        }
      },
      title: {
        offsetCenter: [0, '-0%'],
        fontSize: 20
      },
      detail: {
        fontSize: 30,
        offsetCenter: [0, '-35%'],
        valueAnimation: true,
        formatter: function (value) {
          return Math.round(value * 100) + ''
        },
        color: 'inherit'
      },
      data: [
        {
          value: costEffectiveness.value / 200
        }
      ]
    }
  ]
}

const toggleVisibility = () => {
  isVisible.value = !isVisible.value
  if (!isVisible.value) {
    nextTick().then(() => {
      // animation()
      if (myChart != null && myChart.dispose) {
        myChart.dispose()
      }
      myChart = echarts.init(document.getElementById('main sales'))
      myChart.setOption(costEffectiveOption)
      if (parseInt(costEffectiveness.value) <= 100) {
        const imageElement = document.querySelector('.card-img-comp-sale img')
        imageElement.style.margin = '50px' // 이미지 위치 조정
        imageElement.style.width = '150px' // 이미지
        imageElement.style.marginTop = '0' // 이미지 위치 조정
      }
    })
  } else {
    nextTick().then(() => {
      if (myChart != null && myChart.dispose) {
        myChart.dispose()
      }

      myChart = echarts.init(document.getElementById('sub sales'))
      myChart.setOption(comparisonCalOptin)
    })
  }
}
onMounted(() => {
  animation()
})

const animation = () => {
  if (myChart != null && myChart.dispose) {
    myChart.dispose()
  }
  if (parseInt(costEffectiveness.value) <= 100) {
    isWorry.value = '있겠어요.'
    isWorryImage.value = '/src/assets/img/card/sale-card/sales-crying-cat.gif'

    const imageElement = document.querySelector('.card-img-comp-sale img')
    imageElement.style.margin = '50px' // 이미지 위치 조정
    imageElement.style.width = '150px' // 이미지
    imageElement.style.marginTop = '0' // 이미지 위치 조정
  } else {
    console.log(costEffectiveness.value)
    isWorryImage.value = '/src/assets/img/card/sale-card/sales-happy-cat2.gif'
    isWorry.value = '없겠어요'
  }
  myChart = echarts.init(document.getElementById('main sales'))
  myChart.setOption(costEffectiveOption)
}

defineExpose({
  animation
})
</script>

<style scoped>
.card-design {
  height: 100%;
  perspective: 1000px; /* 3D 변환을 위한 원근 거리 설정 */
}

.card {
  position: absolute;
  width: 100%;
  height: 100%;
  transition: transform 0.5s;
  transform-style: preserve-3d; /* 3D 변환을 유지하여 자식 요소를 3D 공간에 배치 */
}

.front,
.back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden; /* 뒷면 숨김 */
}

.front {
  background-color: #ffffff;
}

.back {
  transform: rotateY(180deg); /* 뒷면 회전 */
}

.flipped .front {
  transform: rotateY(-180deg); /* 앞면 회전 */
}

.flipped .back {
  transform: rotateY(0deg); /* 뒷면 회전 */
}

.card-report-text span.per {
  font-weight: bold;
  font-size: 20px;
  color: rgb(139, 84, 60);
}
.main-text {
  font-size: 30px;
}
.card-sub-text-comp {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  text-align: left;
  margin-top: 5%;
}
.card-sub-text {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  line-height: 30px;

  color: gray;
}
.card-sub-text span {
  color: rgb(139, 84, 60);
  font-size: 20px;
}
.card-main-text-comp {
  margin-top: 5%;
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: left;
}

.card-main-text {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-size: 30px;
  line-height: 45px;
  letter-spacing: -3px;
  color: #000000;
}
.card-img-comp {
  height: 100%;
}
.testtest {
  position: absolute;
  height: 50%;
  left: -35px;
  width: 100%;
}
.q-pa-md {
  height: 100%;
  position: relative;
  overflow: hidden;
}
.detail-btn {
  background-image: linear-gradient(to right, #d9ccbd, #efe9d9);
  position: absolute;
  bottom: 1svh;
  right: 2svw;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #efe9d9;
  border: 2px solid black;
  border-radius: 20px;
  padding: 5px 15px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.detail-btn img {
  height: 30px;
  margin-right: 5px;
}

.detail-btn:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.background-image {
  position: absolute;
  /* top: 0; */
  /* left: 0; */
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.average-effect {
  position: absolute;
  /* bottom: 34%; */
  /* left: 0; */
  display: flex;
}
.card-report-text span {
  color: rgb(139, 84, 60);
}
.card-report-text {
  font-weight: bold;
  font-size: 20px;
  padding: 10px;
  line-height: 26px;
  letter-spacing: -2px;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 그림자 효과를 추가합니다. */
}
.card-report-title {
  margin-top: 8%;
  font-family: 'Inter';
  font-weight: bold;
  font-size: 24px;
  margin-bottom: 10px;
  color: #333;
}
.report-text-par {
  margin-bottom: 8px;
}
</style>
