<script setup>
import { onMounted, ref, defineProps, defineEmits } from 'vue'
import 'animate.css/animate.min.css'
import { useSimulationStore } from '@/stores/simulationStore.js'

const props = defineProps(['isCardDetail', 'title', 'input'])
const tags = props.tag

const simulation = useSimulationStore()
const { selectBrand, input, facilityList, facilityType, revenueList, facilityTypeList } = simulation
// const { input, modify } = storeToRefs(simulation)

onMounted(() => {
  console.log('mounted')
  // document.getElementById('cdc').classList.add('animate__animated')
  console.log('input', input)
})
</script>

<template>
  <div class="cardDetailContainer" id="cdc">
    <!-- <a href="/store_info" style="width: 30px">X</a> -->
    <p @click="$emit('close', false)" class="close">X</p>
    <div class="text">
      <h6>{{ props.title }}</h6>
      <div>{{ input }}</div>
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
  height: 300px;
  left: -5px;
  margin: 12px;
  top: 160px;

  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
  background: #ffffff;
  border-radius: 20px;
}

.close {
  margin: 20px;
  font-size: large;
}

.text {
  margin: 2px;
}

.tags {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  /* justify-content: start; */
  margin-left: 10px;
  color: #888888;
}

.tag {
  margin: 5px;
}

img {
  width: 150px;
}

h6 {
  display: flex;
  justify-content: center;
}
</style>
