<script setup>
import { onMounted, ref, defineProps } from 'vue'
import StatementOfFinancialPosition from '@/components/SimulationReport/StatementOfFinancialPosition.vue'
import IncomeStatement from '@/components/SimulationReport/IncomeStatement.vue'
import { useSimulationStore } from '@/stores/simulationStore'

const simulation = useSimulationStore()
const { revenueList } = simulation

const period = function () {
  let result = ''
  // console.log('+++++', revenueList)
  result += revenueList[24].year + '년 '
  result += revenueList[24].month + '월 ~ '
  result += revenueList[35].year + '년 '
  result += revenueList[35].month + '월'

  // console.log('result', result)
  return result
}
</script>

<template>
  <q-page class="q-mb-md card">
    <StatementOfFinancialPosition :year="2" />
    <span>{{ period() }}</span>
    <IncomeStatement :year="2" />
  </q-page>
</template>

<style scoped>
.FistYearContainer {
  /* background-image: url('@/../public/apaper.jpg'); */
  /* width: 100%;
  height: 100%; */
  width: 500px;
  height: 800px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

span {
  font-size: 20px;
  /* font-weight: bold; */
  margin-top: 20px;
}
</style>
