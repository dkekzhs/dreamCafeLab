<template>
  <div class="q-pa-md average">
    <div class="card-design" :class="{ flipped: isVisible }">
      <div class="card front card-main-text-comp" ref="mainText">
        <div class="card-main-text closing">사장님 100명 중</div>
        <div v-if="!isVisible" class="card-main-text closing">
          <span>{{ Math.round(closures * 100) }}</span> 명이
        </div>
        <div class="card-main-text closing">울게 돼요..</div>
        <div class="card-img-comp">
          <img
            v-if="!isVisible"
            src="../../assets/img/card/closing-card/closing-building.png"
            class="card-img closed-coffee-shop"
            alt="Coffe Shop"
            ref="coffeShop"
          />
          <img
            v-if="!isVisible"
            src="../../assets/img/card/closing-card/closing-crying-cat.gif"
            class="card-img crying-cat"
            alt="Crying Cat"
            ref="cryingCat"
          />
        </div>
      </div>

      <div class="card back detail-design">
        <div id="main closing" style="width: 100%; height: 250px" ref="chartDom"></div>
        <div class="card-report-title">분석 내용</div>
        <div class="card-report-text">
          <div class="info">
            지난 분기 대비 카페 수
            <span class="per">{{ Math.abs(numOfCafe - numOfCafe1).toString() }}개</span>
            <span :class="[numOfCafe > numOfCafe1 ? 'red-arrow' : 'green-arrow']">{{
              numOfCafe > numOfCafe1 ? '▲' : '▼'
            }}</span>
          </div>
          <div class="report-text-par">
            전체 상권 <span class="per">1006</span> 곳 중 폐업률이
            <span class="per">{{ closeGrade }}</span
            >등을 차지해요.
          </div>
          <div class="report-text-par">
            개업 수와 폐업 수를 따져본 결과, 개업 대비 폐업률은
            <span class="per">{{ Math.round(closures * 100) }}%</span> 입니다.
          </div>
        </div>
        <div class="card-sub-text-comp">
          <div class="card-sub-text">※ 2023년 3분기가 최신데이터</div>
          <div class="card-sub-text">※ 데이터 출처 : 서울시 열린 데이터 광장</div>
          <!-- <div class="card-sub-text">※ 전체 상권 <span>1006</span>개</div> -->
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
import { onMounted, ref, nextTick, defineProps } from 'vue'
import { gsap } from 'gsap'
import * as echarts from 'echarts'
// props 유효성 검사
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
const { closures, closureTopPercent, numOfCafe, numOfCafe1, numOfCafe2, numOfCafe3 } = data || {}

const closeGrade = parseInt((closureTopPercent / 100) * 1006)
const chartDom = ref(null)
let myChart = null
/*
 아래는 애니메이션
*/
const mainText = ref(null)
const isVisible = ref(false)
let tl = null
const option = {
  title: {
    text: '폐업률 보고서',
    subtext: '카페 수 현황',
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
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['22/4', '23/1', '23/2', '23/3'],
    name: '분기',
    nameLocation: 'middle', // 라벨 위치를 중앙으로 설정
    nameGap: 25, // 라벨과 축 간의 간격 조정
    nameTextStyle: {
      fontSize: 16, // 라벨의 글꼴 크기 조정
      color: '#333' // 라벨의 글꼴 색상 설정
    }
  },
  yAxis: {
    type: 'value',
    min: Math.min(numOfCafe3, numOfCafe2, numOfCafe1, numOfCafe) - 3, // 최소값 설정
    max: Math.max(numOfCafe3, numOfCafe2, numOfCafe1, numOfCafe) + 3 // 최대값 설정
  },
  series: [
    {
      data: [numOfCafe3, numOfCafe2, numOfCafe1, numOfCafe],
      type: 'line',
      areaStyle: {
        color: 'rgba(0, 0, 255, 0.3)' // 연한 파랑으로 지정
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
      myChart = echarts.init(document.getElementById('main closing'))

      myChart.setOption(option)
    })

    if (tl) {
      tl.kill()
    }
  }
}

const animation = () => {
  const mainText = document.querySelector('.card-main-text:nth-child(2).closing')

  // GSAP 애니메이션 설정
  tl = gsap.timeline({ repeat: 0 })

  tl.to(mainText, { duration: 0.5, y: '-=20', ease: 'power1.inOut' }) // 약간 위로 이동
  tl.to(mainText, { duration: 0.5, y: '+=40', ease: 'power1.inOut' }) // 아래로 떨어지기
  tl.to(mainText, { duration: 0.1, y: '-=10', repeat: 5, yoyo: true, ease: 'power1.inOut' }) // 진동 효과
  tl.to(mainText, { duration: 0.5, y: '0', ease: 'power1.inOut' }) // 초기 위치로 돌아오기

  // 이미지 애니메이션 설정
  const coffeShopImage = document.querySelector('.card-img.closed-coffee-shop')
  const cryingCatImage = document.querySelector('.card-img.crying-cat')
  tl.from(coffeShopImage, { duration: 1, opacity: 0, y: '-=100', ease: 'power1.inOut' }, '-=1') // coffeShop 이미지 애니메이션
  tl.from(cryingCatImage, { duration: 1, opacity: 0, y: '-=100', ease: 'power1.inOut' }, '-=1') // cryingYoda 이미지 애니메이션
}

onMounted(() => {})

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
  perspective: 1000px;
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
.card-main-text-comp {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.card-main-text {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-size: 35px;
  line-height: 80px;
  letter-spacing: -2px;
  color: #000000;
}
.card-main-text:nth-child(3) {
  margin-top: -5px;
}
.card-main-text span {
  font-weight: 900;
  color: rgb(139, 84, 60);
  font-size: 80px;
}
.card-img-comp {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 75%;
  left: 50%;
  transform: translate(-50%, -50%); /* 가운데 정렬 */
}

.card-img {
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%); /* 가운데 정렬 */
}

.card-img.closed-coffee-shop {
  /* max-height: 100%; */
  /* width: 100%; */
}

.card-img.crying-cat {
  max-height: 30%;
  margin-left: 30%;
  margin-top: 80px; /* 원하는 만큼 조절하세요 */
}

/*
  Detail 관련 css
*/

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
  color: rgb(139, 84, 60);
  font-size: 20px;
}

.card-report-text span.per {
  font-weight: bold;
  font-size: 20px;
  color: rgb(139, 84, 60);
}
.red-arrow {
  color: red;
}
.green-arrow {
  color: blue;
}
.card-report-text .info {
  font-weight: bold;
  font-size: 18px;
  color: gray;
  line-height: 23px;
  margin-bottom: 10px;
}
.report-text-par {
  margin-bottom: 8px;
}
</style>
