<script setup>
import { onMounted, ref, defineProps } from 'vue'
import StoreInfoCard from '@/components/SimulationReport/StoreInfo/StoreInfoCard.vue'

const brand = '할리스'
const nickName = '서낌'
const employee = [3, 4, 5, 6, 7, 8, 9, 10]
const early_funds = 1000000 // ,으로 구분할 수 있도록 수정 필요
const total_income = 230000000 // ,으로 구분할 수 있도록 수정 필요
const recommend_continue =
  total_income - early_funds > 0
    ? `투자금을 ${total_income - early_funds}원 회수하였네요!`
    : `투자금을 ${early_funds - total_income}원 잃었어요...`
const interior_cost = 10000000

const contents1 = [
  '어서오세요',
  `${brand} ${nickName}점의 가게 정보를 상세하게 알려드릴게요`,
  `초기 투자자금은 ${early_funds}원 입니다.`,
  `시뮬레이션 결과, 3개월 후의 예상 잔고는 ${total_income}원 입니다.`,
  `${recommend_continue}`,
  `잔고가 ${total_income}원이 되기까지의 과정을 알려드릴게요`
]

const contents2 = [
  '임대료는 직원 수에 따라 매달 변동되었습니다.',
  `매달 변동되는 임대료는 가게 운영에 큰 영향을 미칩니다.`,
  `최적의 직원 수를 찾아 임대료를 절감해보세요!`,
  `직원 수의 변화에 따른 임대료 변화를 그래프로 보여드릴게요`
]

const contents3 = [
  '마지막으로 가게의 비용 정보를 알려드릴게요',
  '일회성 초기 창업 비용으로 인테리어비가 지불되었습니다.',
  `인테리어비 : ${interior_cost}원`,
  '매달 일정한 기준으로 발생하는 비용은 월 대출 이자금, 월 임대료가 있습니다.',
  `월 임대료 : 1000000원`,
  `월 대출 이자금 : 1000000원`,
  `월 임대료와 월 대출 이자금을 합한 비용은 ${1000000 + 1000000}원 입니다.`
]
</script>

<template>
  <span>뒤로가기 아이콘</span>
  <div class="storeInfoContainer">
    <div class="logo_and_basicInfo">
      <img src="@/../public/simulationReport/할리스.png" alt="" />
      <div>
        <h5>할리스 {{ nickName }}점</h5>
        <p>서울특별시 강남구 역삼동 123-45</p>
        <p>02-1234-5678</p>
      </div>
    </div>
    <div class="cards">
      <StoreInfoCard v-for="content in contents1" :content="content" />
      <h5>잔고 그래프</h5>
      <StoreInfoCard v-for="content in contents2" :content="content" />
      <h5>직원 수에 따른 임대료 그래프</h5>
      <StoreInfoCard v-for="content in contents3" :content="content" />
    </div>
  </div>
</template>

<style scoped>
.storeInfoContainer {
  width: 350px;
  height: 600px;
  background-color: white;
}

.logo_and_basicInfo {
  box-shadow: 1px 1px 1px 1px #888888;
  display: flex;
  flex-direction: row;

  position: absolute;
  width: 100%;
  height: 100px;
  left: -5px;
  /* margin-top: 20px; */
  top: 40px;

  background: #ffffff;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
}

.cards {
  /* Rectangle 104 */
  overflow: scroll;
  position: absolute;
  width: 100%;
  height: 600px;
  top: 150px;

  background: #f3f2f2;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
  /* border-radius: 20px; */
}

img {
  width: 100px;
  height: 100px;
}

h4 {
  margin-top: 30px;
}
</style>
