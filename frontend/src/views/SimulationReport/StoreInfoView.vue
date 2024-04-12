<script setup>
import { onMounted, ref, defineProps, reactive } from 'vue'
import StoreInfoCard from '@/components/SimulationReport/StoreInfo/StoreInfoCard.vue'
import { useSimulationStore } from '@/stores/simulationStore.js'
import StoreInfoBasic from '@/components/SimulationReport/StoreInfo/StoreInfoBasic.vue'
import StoreInfoFacility from '@/components/SimulationReport/StoreInfo/StoreInfoFacility.vue'
import StoreInfoBrand from '@/components/SimulationReport/StoreInfo/StoreInfoBrand.vue'
import StoreInfoCost from '@/components/SimulationReport/StoreInfo/StoreInfoCost.vue'
import BackHeader from '@/components/BackHeader.vue'
import { useDataStore } from '@/stores/dataStore'

const simulation = useSimulationStore()
const data = useDataStore()
const { selectBrand, input, facilityList, facilityType, revenueList, facilityTypeList } = simulation
const { address } = data

onMounted(() => {
  console.log('selectBrand', selectBrand)
  console.log('input', input)
  console.log('facilityList', facilityList)
  console.log('facilityType', facilityType)
  console.log('revenueList', revenueList)
  console.log('facilityTypeList', facilityTypeList)
})

const showCardDetail = reactive([false, false, false, false])
const isCardDetail = ref(false)

const tags = [
  ['투자금', '3년', '손익', '차릴만한가?'],
  ['3년'],
  ['총몇명', '인건비'],
  ['초기투자금', '고정비용', '변동비용', '총비용']
]

const updateIsCardDetail = function (cardNum) {
  console.log('isCardDetail', isCardDetail.value)
  console.log('showCardDetail', showCardDetail[cardNum])
  if (!isCardDetail.value) {
    showCardDetail[cardNum] = !showCardDetail[cardNum]
    isCardDetail.value = !isCardDetail.value
    return
  }
  if (showCardDetail[cardNum]) {
    showCardDetail[cardNum] = !showCardDetail[cardNum]
    isCardDetail.value = !isCardDetail.value
  } else {
    for (let i = 0; i < showCardDetail.length; i++) {
      showCardDetail[i] = false
    }
    showCardDetail[cardNum] = !showCardDetail[cardNum]
  }
}

onMounted(() => {
  console.log('mounted')
  console.log(address + '주소')
})
</script>

<template>
  <q-page class="q-pa-md storeInfoContainer">
    <BackHeader></BackHeader>
    <div class="logo_and_basicInfo">
      <img class="rotate-in-ver" :src="`${selectBrand.cafeLogo}`" alt="" />
      <div class="basicInfo">
        <div>{{ selectBrand.brandName }}</div>
        <p>{{ address }}</p>
      </div>
    </div>
    <div class="cards">
      <StoreInfoCard
        @click="updateIsCardDetail(0)"
        :title="'투자 대비 이익'"
        :tag="tags[0]"
        :img="'src/assets/img/simulationReport/cost.png'"
      />
      <StoreInfoCard
        class="card"
        @click="updateIsCardDetail(3)"
        :title="'비용 분석'"
        :tag="tags[3]"
        :img="'src/assets/img/simulationReport/profit.png'"
      />
      <StoreInfoCard
        class="card"
        @click="updateIsCardDetail(1)"
        :title="'주변 편의시설'"
        :tag="tags[1]"
        :img="'src/assets/img/simulationReport/facility.png'"
      />
      <StoreInfoCard
        class="card"
        @click="updateIsCardDetail(2)"
        :title="'브랜드 분석'"
        :tag="tags[2]"
        :img="'src/assets/img/simulationReport/brand.png'"
      />
    </div>
    <div class="cardDetails" v-if="isCardDetail">
      <StoreInfoBasic v-if="showCardDetail[0]" @close="updateIsCardDetail(0)" />
      <StoreInfoFacility v-if="showCardDetail[1]" @close="updateIsCardDetail(1)" />
      <StoreInfoBrand v-if="showCardDetail[2]" @close="updateIsCardDetail(2)" />
      <StoreInfoCost v-if="showCardDetail[3]" @close="updateIsCardDetail(3)" />
    </div>
  </q-page>
</template>

<style scoped>
.rotate-in-ver {
  animation: rotate-in-ver 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}

@keyframes rotate-in-ver {
  0% {
    transform: rotateY(-360deg);
    opacity: 0;
  }
  100% {
    transform: rotateY(0deg);
    opacity: 1;
  }
}

.q-pa-md.storeInfoContainer {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}

.logo_and_basicInfo {
  /* box-shadow: 1px 1px 1px 1px #938888; */
  display: flex;
  flex-direction: row;
  justify-content: center;

  /* position: absolute; */
  width: 100%;
  height: auto;

  /* background: #ffffff; */
  /* box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25); */
  /* border-radius: 20px; */
}

.basicInfo {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;

  padding: 10px;
}

.basicInfo div {
  font-size: 25px;
  font-weight: bold;
}

.cards {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 10px;
}

.cardDetails {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 100%;
  height: 100%;
}

img {
  width: 11svh;
  height: 11svh;
}
</style>
