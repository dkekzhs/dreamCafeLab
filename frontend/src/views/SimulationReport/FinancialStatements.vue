<script setup>
import { onMounted, ref, defineProps } from 'vue'
import router from '@/router'
import IncomeChart from '@/components/SimulationReport/StatementOfFinancialPosition/IncomeChart.vue'
import { useSimulationStore } from '@/stores/simulationStore'
import BackHeader from '@/components/BackHeader.vue'

const simulation = useSimulationStore()
const { updateRevenueList, revenueList } = simulation

onMounted(() => {
  console.log('mounted')
  updateRevenueList()
  console.log('revenueList', revenueList)
})
</script>

<template>
  <q-page class="q-pa-md financial-statements">
    <BackHeader />
    <div class="title">재무제표</div>
    <IncomeChart style="margin-bottom: 10%" />
    <div class="router_links">
      <router-link class="router_link" active-class="active-link" :to="{ name: 'first_year' }"
        >1년</router-link
      >
      <router-link class="router_link" active-class="active-link" :to="{ name: 'second_year' }"
        >2년</router-link
      >
      <router-link class="router_link" active-class="active-link" :to="{ name: 'third_year' }"
        >3년</router-link
      >
    </div>
    <router-view class="router_view"></router-view>
  </q-page>
</template>

<style scoped>
.back {
  top: 10px;
  left: 10px;
  width: 25px;
  height: 25px;
  margin: 10px;
  margin-bottom: 0;
}

.title {
  font-size: 30px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 0;
  margin-bottom: 5%;
}

.q-pa-md {
  position: relative;
  height: auto;
  overflow-y: auto;
}

.q-pa-md.financial-statements {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
}

.router_links {
  /* padding-top: 20px; */
  /* padding-left: 20px; */
  display: flex;
  justify-content: space-evenly;
}

/* 선택되었을 때의 색상 및 강조 효과 설정 */
.router_link.active-link {
  color: #ffffff; /* 선택된 링크의 색상을 빨간색으로 설정 */
  border-bottom: 2px solid #ffffff; /* 선택된 링크의 아래쪽에 빨간색으로 두꺼운 선 추가 */
}

/* 나머지 링크들에 대한 스타일 설정 */
.router_link {
  margin: 10px;
  padding: 10px;
  text-decoration: none;
  font-size: 2svh;
  background-color: rgba(216, 127, 89, 0.552);
  border-radius: 50px;

  font-weight: bold;
  color: black; /* 기본적으로 링크의 색상은 검정색 */
  transition:
    color 0.3s,
    border-bottom 0.3s; /* 변화에 애니메이션을 부여하기 위한 트랜지션 설정 */
}

/* 마우스를 올렸을 때의 스타일 설정 */
.router_link:hover {
  color: #ffffff; /* 마우스를 올렸을 때 링크의 색상을 빨간색으로 변경 */
}

.router_view {
  /* border: 1px solid black; */
  /* background-color: white; */
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.D3Chart {
  /* border: 1px solid black; */
  /* background-color: white; */
  margin-top: 10px;
  /* width: 100px;
  height: 150px; */
}
</style>
