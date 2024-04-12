<script setup>
import { onMounted, ref, defineProps, defineEmits } from 'vue'
import 'animate.css/animate.min.css'
import { useSimulationStore } from '@/stores/simulationStore.js'

import CostChart from './CostChart.vue'
import EmployeeChart from './EmployeeChart.vue'

const props = defineProps(['isCardDetail', 'title'])
const tags = props.tag

const simulation = useSimulationStore()
const { selectBrand, input, facilityList, facilityType, revenueList, facilityTypeList } = simulation

onMounted(() => {
  console.log('mounted')
})
</script>

<template>
  <div class="cardDetailContainer" id="cdc">
    <p @click="$emit('close', false)" class="close">X</p>
    <span class="title">비용 분석 결과</span>
    <div class="costRatio">
      <p class="subTitle">가게 비용</p>
      <CostChart />
    </div>
    <!-- <div>
      <p class="subTitle">인건비 변화</p>
      <EmployeeChart />
    </div> -->
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

  width: 390px;
  /* height: 300px; */
  left: -5px;
  margin: 12px;
  top: 160px;

  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.25);
  background: #ffffff;
  border-radius: 20px;
}

.costRatio {
  margin-top: 10%;
  margin-bottom: 28%;
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

.subTitle {
  font-size: 3svh;
  margin: 10px;
  background-color: rgb(255, 240, 221);
}
</style>
