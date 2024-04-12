<script setup>
import { onMounted, reactive, ref, defineProps, defineEmits } from 'vue'
import 'animate.css/animate.min.css'
import { useSimulationStore } from '@/stores/simulationStore.js'

const simulation = useSimulationStore()
const { total_net_income, input } = simulation
const numberWithCommas = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

const average_sales = 24728880 // 2024년 평균 알바 급여
const result = parseInt((total_net_income[0] + total_net_income[1] + total_net_income[2]) / 3) // 3년 평균 이익
const resultText = result > average_sales ? '알바보다 더 잘벌어요🤑' : '알바보다 못 벌어요😱'

// 각 요소에 대한 정보를 가지고 있는 배열
const items = reactive([
  {
    content: `<div style="font-size: 2.5svh; font-weight:bold; margin-top:10%;">초기 투자비 ${numberWithCommas(input.initialPrice * 10000)} ₩</div>`,
    visible: false
  },
  {
    content: `<div style="font-size: 2.5svh; font-weight:bold; margin-top:10%;">대출금 ${numberWithCommas(input.loanAmount * 10000)} ₩</div>`,
    visible: false
  },
  {
    content:
      '<img src="/src/public/simulationReport/RainingCoins.gif" style="width:60%; height:15%;position:absolute; margin-left:-25%;" /><img src="/src/public/simulationReport/DownArrow.png" style="height: 70%; margin-top: 50%; margin-buttom: 50%;" />',
    visible: false
  },
  {
    content: `<div >3년동안 연평균 이익 </div><div style="font-size: 4svh; font-weight:bold;  color: #FFCC00;">${numberWithCommas(result)} ₩</div>`,
    visible: false
  },
  {
    content: `<div style="font-size: 2svh; margin-top:10%; color: #999999;"> 차액 ${numberWithCommas(parseInt(Math.abs(24728880 - result)))} ₩</div>`,
    visible: false
  }
])

// 요소들을 순차적으로 처리하기 위한 함수
const fadeInElements = () => {
  items.forEach((item, index) => {
    setTimeout(() => {
      item.visible = true // 요소가 나타나도록 visible 값을 true로 변경
    }, index * 1000) // 각 요소마다 0.5초씩 시간차를 둡니다.
  })
}

onMounted(() => {
  console.log('mounted')
  fadeInElements()
})
</script>

<template>
  <div class="cardDetailContainer" id="cdc">
    <p @click="$emit('close', false)" class="close">X</p>
    <span style="margin-bottom: 10%">투자 대비 이익</span>
    <div class="main">
      <p style="color: #666">
        2024년 평균 알바비 <b>{{ numberWithCommas(average_sales) }}</b> ₩
      </p>
      <p class="result">{{ resultText }}</p>
      <div
        v-for="(item, index) in items"
        :key="index"
        :class="{ hidden: !item.visible, 'fade-in': item.visible }"
        v-html="item.content"
      ></div>
    </div>
  </div>
</template>

<style scoped>
.cardDetailContainer {
  display: flex;
  flex-direction: column; /* 내부 아이템을 세로로 배열합니다. */
  justify-self: center;
  width: 150px; /* 가로 길이를 고정합니다. */
  height: auto; /* 내부 아이템에 맞게 세로 크기가 유연하게 조정됩니다. */
  /* flex-wrap: wrap; */

  width: 350px;
  height: 70%;
  left: -5px;
  margin: 12px;
  top: 160px;

  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
  background: #ffffff;
  border-radius: 20px;
}

.thing {
  font-size: 20px;
  font-weight: bold;
  display: flex;
  justify-content: center;
}

.cardDetailContainer span {
  margin: 2px;
  font-size: 30px;
  font-weight: bold;
  display: flex;
  justify-content: center;
}

.close {
  margin: 20px;
  margin-bottom: 0%;
  font-size: large;
}

.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.result {
  font-size: 3svh;
  font-weight: bold;
  margin-bottom: 3svh;
}

/* 초기에는 숨겨진 상태로 설정 */
.hidden {
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
}
/* 나타날 때 opacity를 1로 설정하여 나타나는 효과 생성 */
.fade-in {
  opacity: 1;
}
</style>
