<script setup>
import router from '@/router'
import { onMounted, ref } from 'vue'
import { useSimulationStore } from '@/stores/simulationStore'

const simulation = useSimulationStore()
const { selectBrand, updateRevenueList, total_net_income } = simulation
// 브랜드 이미지 업데이트 필요함
const brandLogoPath = ref(selectBrand.cafeLogo)

const financialStatementText = ref('')
const storeInfoText = ref('')
const averateIncome = 24728880

onMounted(() => {
  updateRevenueList()
  console.log('total_net_income', total_net_income)
  console.log('selectBrand.cafeLogo', selectBrand.cafeLogo)
  // 가게 정보 텍스트 업데이트
  if (total_net_income[0] + total_net_income[1] + total_net_income[2] >= averateIncome) {
    storeInfoText.value = '알바보다 잘 벌어요'
  } else {
    storeInfoText.value = '알바보다 못 벌 수 있어요'
  }
  // 재무제표 텍스트 업데이트
  if (total_net_income[0] <= total_net_income[1] <= total_net_income[2]) {
    financialStatementText.value = '순이익이 오르고 있어요'
  } else {
    financialStatementText.value = '항상 벌지는 못 해요'
  }
})

const moveToFinancialStatements = function () {
  console.log('moveToFinancialStatements')
  router.push('/financial_statements/first_year')
}

const moveToStoreInfo = function () {
  console.log('moveToStoreInfo')
  window.location.href = '/store_info'
}
</script>

<template>
  <q-page class="scroll-container">
    <q-page class="q-pa-md poly-file scroll-area">
      <div class="scroll-area">
        <div class="title">
          <strong style="font-size: 3.8svh">
            <p style="display: inline; color: rgb(139, 84, 60)">시뮬레이션</p>
            결과를 <br />
            분석해보았어요
          </strong>
        </div>
        <img class="cat" src="@/assets/img/home/MQC.gif" />
        <div class="buttons">
          <div
            class="financialStatements button"
            @click="moveToFinancialStatements"
            :simulationReportData="simulationReportData"
            style=""
          >
            <img src="@/../public/simulationReport/financial.png" alt="" />
            <div>
              <p style="font-size: 2svh">재무상태표, 손익계산서</p>
              <p style="font-size: 2.3svh; color: black">{{ financialStatementText }}</p>
            </div>
          </div>
          <div
            class="storeInfo button"
            @click="moveToStoreInfo"
            :simulationReportData="simulationReportData"
            style="margin-top: 8svh"
          >
            <img :src="`${brandLogoPath}`" alt="" />
            <div>
              <p style="font-size: 2svh">가게 정보</p>
              <p style="font-size: 2.3svh; color: black">{{ storeInfoText }}</p>
            </div>
          </div>
        </div>
      </div>
    </q-page>
    <!-- <q-page class="scroll-area">
      <KakaoMap />
      <ul id="credits-list">
        <li>감독: 감독 이름</li>
        <li>주연: 주연 배우들</li>
        <li>조연: 조연 배우들</li>
        <li>제작: 제작진 명단</li>
        <li>음악: 음악 담당자</li>
        <li>미술: 미술 담당자</li>
        <li>특수효과: 특수효과 담당자</li>
        <li>편집: 편집 담당자</li>
      </ul>
    </q-page> -->
  </q-page>
</template>

<style scoped>
.cat {
  width: 50%;
  height: 50%;
  margin-left: 55%;
  margin-top: 10%;
}

.q-pa-md.poly-file {
  position: relative;
  /* overflow: hidden; */
  width: 100%;
  height: 100%;
}

/* 부모 스크롤 스냅 컨테이너 */
.scroll-container {
  scroll-snap-type: y mandatory;
  overflow-y: scroll;
  height: 100vh;
}

.scroll-area {
  width: 100%;
  scroll-snap-align: start;
  padding-top: 8svh;
  padding-left: 1svh;
  padding-right: 1svh;
  padding-bottom: 3svh;
}

.header {
  position: absolute;
  width: 390px;
  height: 72px;
  left: 0px;
  top: 0px;
}

.back {
  position: absolute;
  width: 28px;
  height: 24px;
  left: 21px;
  top: 24px;

  background: url(free-icon-left-arrow-271218.png);
}

.title {
  position: absolute;
  top: 13%;
  width: 300px;
  height: 70px;
  left: calc(50% - 228px / 2 - 46px);
  /* top: 189px; */

  /* font-family: 'Inter'; */
  font-style: border;
  font-weight: 700;
  font-size: 20px;
  line-height: 36px;

  color: #000000;
}

.financialStatements {
  position: absolute;
  width: 300px;
  height: 86px;
  left: 20px;
  top: 350px;

  background: #ffffff;
  box-shadow: 0px 1px 10px 1px rgba(0, 0, 0, 0.25);
  border-radius: 15px;

  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  line-height: 18px;

  color: #818181;
}

.storeInfo {
  position: absolute;
  width: 300px;
  height: 86px;
  left: 20px;
  top: 480px;

  background: #ffffff;
  box-shadow: 0px 1px 10px 1px rgba(0, 0, 0, 0.25);
  border-radius: 15px;

  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  line-height: 18px;

  color: #818181;
}

.buttons img {
  width: 10svh;
  height: 60%;
  margin: 10px;
}

.button {
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  width: 90%; /* 이후 문제 가능성 있음 */
  height: 18svh;
}

/* .buttons div {
  font-size: 5svh;
} */

a {
  box-shadow: 1px 1px 1px 1px #888888;
  /* display: flex;
  flex-direction: row;
  justify-content: center; */

  position: static;
  width: 300px;
  height: 100px;
  /* left: -5px; */
  /* margin-top: -200px; */
  margin-top: 40px;
  margin-left: -100px;

  background: #ffffff;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
}

.router_links {
  /* padding-top: 150px; */
  padding-left: 50px;
}

.router_link {
  margin: 10px;
  padding-bottom: 10px;
}

.router_view {
  margin-top: 10px;
  padding-top: 10px;
}

.ending-credits {
  position: relative;
  height: 100%;
  overflow: hidden;
}

#credits-list {
  position: absolute;
  bottom: 0;
  list-style-type: none;
  margin: 0;
  padding: 0;
  animation: scroll 20s linear infinite;
}

@keyframes scroll {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-100%);
  }
}
</style>
