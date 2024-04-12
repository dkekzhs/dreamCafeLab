<script setup>
import { onMounted, ref, defineProps, defineEmits } from 'vue'
import 'animate.css/animate.min.css'
import { useSimulationStore } from '@/stores/simulationStore.js'
import StoreInfoFacilityChart from './StoreInfoFacilityChart.vue'
import StoreInfoFacilityAndSalesChart from './StoreInfoFacilityAndSalesChart.vue'
import FacilityChart from './FacilityChart.vue'

const simulation = useSimulationStore()
const { selectBrand, input, facilityList, facilityType, revenueList, facilityTypeList } = simulation

onMounted(() => {
  console.log('mounted store info facility')
})
</script>

<template>
  <div class="cardDetailContainer" id="cdc">
    <!-- <a href="/store_info" style="width: 30px">X</a> -->
    <p @click="$emit('close', false)" class="close">X</p>
    <span>주변 편의시설 정보</span>
    <div class="costRatio">
      <p class="subTitle">편의시설 분포</p>
      <!-- <StoreInfoFacilityChart /> -->
      <FacilityChart />
    </div>
    <div>
      <p class="subTitle">집객시설/ 매출 관계</p>
      <StoreInfoFacilityAndSalesChart />
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
  left: -5px;
  margin: 12px;
  top: 160px;

  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
  background: #ffffff;
  border-radius: 20px;
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

.cardDetailContainer span {
  margin: 2px;
  font-size: 30px;
  display: flex;
  justify-content: center;
}

.subTitle {
  font-size: 20px;
  margin: 10px;
}
</style>
