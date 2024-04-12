<template>
  <div class="q-pa-md floating">
    <div class="card-design" :class="{ flipped: isVisible }">
      <div class="card front card-main-text-comp">
        <div class="card-main-text">주 <span>고객층</span>으로</div>
        <div class="card-main-img">
          <img :src="`/src/assets/img/card/floating-card/main/${ageM[ageFloating]}-main.gif`" />
          <img :src="`/src/assets/img/card/floating-card/main/${ageW[ageFloating]}-main.gif`" />
          <!-- <img src="/assets/img/card/floating-card/main/20man-main.gif" /> -->
        </div>
        <div class="card-main-text">
          <span>{{ ageF[ageFloating] }}</span
          >를 노려보세요 !
        </div>
        <div class="card-img-comp">
          <img src="../../assets/img/runner.gif" class="card-img-runner" />
          <img
            src="../../assets/img/card/floating-card/floating-background.png"
            class="card-img-background"
          />
        </div>
      </div>

      <div class="card back detail-design">
        <div id="main floating" style="width: 100%; height: 300px" ref="chartDom"></div>
        <div class="card-report-title">분석 내용</div>
        <div class="card-report-text">
          <div class="info">
            유동 인구:
            <span class="per">{{ numberWithCommas(totalFloating) }}</span> 명<br />
            상주 인구:
            <span class="per">{{ numberWithCommas(resident) }}</span> 명
          </div>

          <div class="report-text-par">
            상권 <span class="per">1006</span> 곳 중 유동 인구 비율이
            <span>{{ parseInt((floatingTopPercent / 100) * 1006) }}</span> 등이에요.
          </div>
          <div class="report-text-par">
            매출과 인구 분석 결과, <span class="per">{{ ageF[ageFloating] }}</span> 연령대를
            주목해보세요.
          </div>
        </div>
        <div class="card-sub-text-comp">
          <div class="card-sub-text">※ 2023년 3분기가 최신데이터</div>
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
import { onMounted, ref, nextTick, defineExpose, computed } from 'vue'
import { gsap } from 'gsap'
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

const {
  ageFloating,
  floating,
  floating10s,
  floating20s,
  floating30s,
  floating40s,
  floating50s,
  resident,
  resident10s,
  resident20s,
  resident30s,
  resident40s,
  resident50s,

  floatingTopPercent
} = data
const ageF = ['10대', '20대', '30대', '40대', '50대 이상']
const ageM = ['10man', '20man', '20man', '40man', '50man']
const ageW = ['10girl', '20girl', '20girl', '40girl', '50girl']
const isVisible = ref(false)
const totalFloating = floating10s + floating20s + floating30s + floating40s + floating50s
const ratioFloating10s = Math.round((floating10s / totalFloating) * 100)
const ratioFloating20s = Math.round((floating20s / totalFloating) * 100)
const ratioFloating30s = Math.round((floating30s / totalFloating) * 100)
const ratioFloating40s = Math.round((floating40s / totalFloating) * 100)
const ratioFloating50s = Math.round((floating50s / totalFloating) * 100)
const ratioResient10s = Math.round((resident10s / resident) * 100)
const ratioResient20s = Math.round((resident20s / resident) * 100)
const ratioResient30s = Math.round((resident30s / resident) * 100)
const ratioResient40s = Math.round((resident40s / resident) * 100)
const ratioResient50s = Math.round((resident50s / resident) * 100)
const numberWithCommas = (number) => {
  if (number.toString().length >= 5) {
    console.log(number.toString().length)
    return (
      number
        .toString()
        .slice(0, -5)
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '만'
    )
  } else {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }
}
/*
  뒷면 그래프
*/
const chartDom = ref(null)
let myChart = null
const option = {
  title: {
    text: '인구 보고서',
    subtext: '상주인구 유동인구 비교',
    left: 'center',
    top: 10,
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
  legend: {
    bottom: 20
  },
  tooltip: {},
  dataset: {
    source: [
      ['product', '상주인구', '유동인구'],
      ['10대', ratioResient10s, ratioFloating10s],
      ['20대', ratioResient20s, ratioFloating20s],
      ['30대', ratioResient30s, ratioFloating30s],
      ['40대', ratioResient40s, ratioFloating40s],
      ['50대', ratioResient50s, ratioFloating50s]
    ]
  },
  xAxis: {
    type: 'category',
    axisLabel: {
      color: '#333', // 폰트 색상
      fontWeight: 'bold', // 폰트 굵기
      fontSize: 10 // 폰트 크기
    }
  },
  yAxis: {
    axisLabel: {
      color: '#333', // 폰트 색상
      fontWeight: 'bold' // 폰트 굵기
    }
  },
  // Declare several bar series, each will be mapped
  // to a column of dataset.source by default.
  series: [
    {
      type: 'bar',
      itemStyle: {
        color: '#5C6BC0' // column 색상
      }
    },
    {
      type: 'bar',
      itemStyle: {
        color: '#FF7043' // column 색상
      }
    }
  ]
}

const toggleVisibility = () => {
  isVisible.value = !isVisible.value
  if (!isVisible.value) {
    nextTick().then(() => {
      animation()
    })
  } else {
    nextTick().then(() => {
      if (myChart != null && myChart.dispose) {
        myChart.dispose()
      }
      myChart = echarts.init(document.getElementById('main floating'))
      console.log(myChart)
      myChart.setOption(option)
    })
  }
}

const animation = () => {
  gsap.set('.card-img-runner', { scale: 4, x: -300, y: 240, opacity: 1 })

  // 애니메이션 정의
  gsap.to('.card-img-runner', {
    x: window.innerWidth,
    duration: 5,
    ease: 'linear',
    repeat: -1,
    onRepeat: resetPosition
  })

  function resetPosition() {
    gsap.set('.card-img-runner', { x: 0, opacity: 1 })
  }
}

// onMounted(() => {animation})
defineExpose({
  animation
})
</script>

<style scoped>
.card-img-comp img {
  overflow: visible; /* 이미지가 부모 요소를 벗어나도록 설정 */
}
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
.info {
  font-weight: bold;
  font-size: 18px;
  color: gray;
  line-height: 23px;
  margin-bottom: 10px;
}
.card-main-img {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.card-main-img img {
  width: 50%;
}
.q-pa-md.floating {
  height: 100%;
  position: relative;
  overflow: hidden;
}
.card-design {
  height: 100%;
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
  height: 30px; /* 이미지 높이 설정 */
  margin-right: 5px; /* 이미지와 텍스트 사이 간격 조절 */
}

.detail-btn:hover {
  background-color: rgba(255, 255, 255, 0.1); /* 마우스 오버 시 배경색 변경 */
}

.card-img-background {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: visible;
}

.card-img-walking-yoda {
  position: absolute;
  width: 7%;
  height: 7%;
  z-index: 1;
}

.card-img-runner {
  position: absolute;
  width: 4%;
  height: 3%;
  z-index: 1;
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
.card-report-text .info span {
  font-weight: bold;
  font-size: 20px;
  color: rgb(139, 84, 60);
}
.card-report-text .info {
  font-weight: bold;
  font-size: 18px;
  color: gray;
  line-height: 23px;
  margin-bottom: 10px;
}
.card-report-title {
  font-family: 'Inter';
  font-weight: bold;
  font-size: 24px;
  margin-bottom: 10px;
  color: #333;
}

/* 텍스트 분할 스타일 */

.split-text {
  display: inline-block;
  white-space: nowrap;
}

.char {
  opacity: 0;
  animation: fadeIn 0.5s forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
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
  font-size: 35px;
  line-height: 45px;
  letter-spacing: -3px;
  color: #000000;
}
.card-main-text span {
  font-weight: 900;
  color: #bb8451;
  font-size: 40px;
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
  color: #bb8451;
  font-size: 20px;
}
.card-report-text span.per {
  font-weight: bold;
  font-size: 20px;
  color: rgb(139, 84, 60);
}
.report-text-par {
  margin-bottom: 8px;
}
</style>
