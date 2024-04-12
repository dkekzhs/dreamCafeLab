<template>
  <div class="q-pa-md average">
    <div class="card-design" :class="{ flipped: isVisible }">
      <div class="card front card-main-text-comp">
        <div class="card-main-text">
          <div>서울시 카페 매출</div>
          <div class="card-main-text">
            <span class="number animate__animated" :class="isVisible ? 'animate__fadeInLeft' : ''">
              {{ grade }}
            </span>
            등
          </div>
          <div class="card-main-text">을 차지해요.</div>
        </div>
        <div class="card-img-comp average">
          <img
            v-if="!isVisible"
            src="../../assets/img/card/average-card/happy-cat.gif"
            class="card-img-cat"
            alt="cat image"
          />
          <img
            v-if="!isVisible"
            src="../../assets/img/card/average-card/coffee-money.gif"
            class="card-img-money"
            alt="money image"
          />
        </div>
      </div>

      <div class="card back detail-design">
        <div id="main average" ref="AverageChartDom" style="width: 100%; height: 250px"></div>
        <div class="card-report-title">분석 내용</div>

        <div class="card-report-text">
          <div class="infos">
            <div class="info">
              서울시 평균 카페 매출 대비
              <span class="per"
                >{{ numberWithCommas(Math.abs(averageSales - cafeSales)) }}만원</span
              >
              <span :class="[cafeSales > averageSales ? 'red-arrow' : 'green-arrow']">{{
                cafeSales > averageSales ? '▲' : '▼'
              }}</span>
            </div>
            <div class="info">
              서울시 평균 평일 매출 대비
              <span class="per"
                >{{ numberWithCommas(Math.abs(weekdaySales - weekdayAverageSales)) }}만원</span
              >
              <span :class="[weekdaySales > weekdayAverageSales ? 'red-arrow' : 'green-arrow']">{{
                weekdaySales > weekdayAverageSales ? '▲' : '▼'
              }}</span>
            </div>
            <div class="info">
              서울시 평균 주말 매출 대비
              <span class="per"
                >{{ numberWithCommas(Math.abs(weekendSales - weekendAverageSales)) }}만원</span
              >
              <span :class="[weekendSales > weekendAverageSales ? 'red-arrow' : 'green-arrow']">{{
                weekendSales > weekendAverageSales ? '▲' : '▼'
              }}</span>
            </div>
          </div>

          <div>
            이 상권은 카페 매출이
            <span class="per">{{ Math.round((cafeSales / districtSales) * 100) }}%</span>를
            차지해요.
          </div>
        </div>
        <div class="card-sub-text-comp">
          <div class="card-sub-text">※ 2023년 3분기가 최신데이터</div>
          <div class="card-sub-text">※ 데이터 출처 : 서울시 열린 데이터 광장</div>
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
import { onMounted, ref, nextTick } from 'vue'
import gsap from 'gsap'
import * as echarts from 'echarts'
const numberWithCommas = (number) => {
  if (number.toString().length >= 5) {
    console.log(number.toString().length)
    return number
      .toString()
      .slice(0, -5)
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  } else {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }
}

const { data, type } = defineProps({
  data: {
    type: Object,
    required: true
  },
  type: {
    type: String,
    required: true
  }
})
const {
  averageSales,
  cafeSales,
  cafeTopPercent,
  cafes,
  districtSales,
  weekdaySales,
  weekendSales,
  weekdayAverageSales,
  weekendAverageSales
} = data || {}
const grade = parseInt((cafeTopPercent / 100) * 1006)
const AverageChartDom = ref(null)
const isVisible = ref(false)
let tl = null
let myChart = null
const mainText = ref(null)

const option = {
  title: {
    text: '카페 매출 보고서',
    subtext: '카페 매출',
    left: 'center',
    top: 0,
    textStyle: {
      fontSize: '30px',
      color: 'black',
      fontWeight: 'bold'
    },
    subtextStyle: {
      fontWeight: 'bold',
      fontSize: 15,
      color: '#666'
    }
  },
  tooltip: {
    trigger: 'item'
  },
  legend: {
    bottom: 40,
    orient: 'vertical',
    left: 'left',
    textStyle: {
      fontWeight: 'bold'
    }
  },
  series: [
    {
      name: '매출',
      type: 'pie',
      radius: '50%',
      data: [
        {
          value: districtSales - cafeSales,
          name: '타 업종 매출',
          itemStyle: { color: ' rgb(195, 171, 116)' }
        }, // 타 업종 매출 색상 변경
        { value: cafeSales, name: '카페 매출', itemStyle: { color: 'rgb(139, 84, 60)' } } // 카페 매출 색상 변경
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
}

const toggleVisibility = () => {
  isVisible.value = !isVisible.value
  if (!isVisible.value) {
    // DOM 업데이트가 완료된 후에 애니메이션을 실행
    // 버튼을 통해 visible 하기때문에 업데이트 되고 해야됨.
    nextTick().then(() => {
      animation()
    })
  } else {
    nextTick().then(() => {
      if (myChart != null && myChart.dispose) {
        myChart.dispose()
      }
      myChart = echarts.init(document.getElementById('main average'))
      myChart.setOption(option)
    })

    if (tl) {
      tl.kill()
    }
  }
}

const animation = () => {
  if (tl) {
    tl.kill() // 이전 애니메이션을 중지
  }

  gsap.fromTo(
    '.card-img-comp.average img',
    { y: 50, opacity: 1 },
    { y: 0, opacity: 1, duration: 1 }
  )
  // gsap.fromTo(
  //   '.card-img-comp img',
  //   { x: 50, y: 50, opacity: 0 },
  //   { x: 20, y: 0, opacity: 1, duration: 1 }
  // )
}

onMounted(() => {
  // animation()
})
defineExpose({
  animation
})
</script>
<style scoped>
/**
  카드 뒤집기 리팩토링
*/
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
  /* background-color: #f0f0f0; */
  transform: rotateY(180deg); /* 뒷면 회전 */
}

.flipped .front {
  transform: rotateY(-180deg); /* 앞면 회전 */
}

.flipped .back {
  transform: rotateY(0deg); /* 뒷면 회전 */
}

.q-pa-md.average {
  height: 100%;
  position: relative;
  overflow: hidden;
}
.card-design {
  height: 100%;
}

.card-main-text span {
  font-weight: 900;
  color: rgb(139, 84, 60);
  font-size: 70px;
}

.card-main-text span.coffee.animate__animated {
  animation-duration: 1s;
}

.card-main-text span.number.animate__animated {
  animation-duration: 1s;
}

.card-main-text {
  margin-top: 25px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-size: 35px;
  line-height: 45px;
  letter-spacing: -3px;
  color: #000000;
  text-align: center;
}

.progress-bar {
  margin-top: 20px;
  width: 100%;
  height: 20px;
  background-color: #ddd;
}

.progress-bar-inner {
  width: 0;
  height: 100%;
  background-color: #bb8451;
}

.card-img-cat {
  position: absolute;
  width: 50%;
  height: 40%;
  left: 52%;
  bottom: 12%;
}

.card-img-money {
  position: absolute;
  width: 100%;
  height: 80%;
  bottom: 7%;
  left: 50%;
  transform: translateX(-60%);
}

/* 애니메이션 효과 */
.animate__animated {
  animation-duration: 1s;
}

.animate__fadeInLeft {
  animation-name: fadeInLeft;
}

.animate__fadeInRight {
  animation-name: fadeInRight;
}

@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translateX(-100px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(100px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/*
 자세히 보기 버튼
*/
.card-report-text .info span.per {
  font-weight: bold;
  font-size: 20px;
  color: rgb(139, 84, 60);
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
.card-report-text .info {
  font-weight: bold;
  font-size: 18px;
  color: gray;
  line-height: 23px;
  margin-bottom: 5px;
}
.infos {
  margin-bottom: 5px;
}
.card-report-title {
  font-family: 'Inter';
  font-weight: bold;
  font-size: 24px;
  margin-bottom: 10px;
  color: #333;
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
  font-size: 23px;
  color: rgb(139, 84, 60);
}
.red-arrow {
  color: red;
}
.green-arrow {
  color: blue;
}
.grade-text {
  font-weight: 700;
  font-size: 15px;
  letter-spacing: -1px;
}
</style>
