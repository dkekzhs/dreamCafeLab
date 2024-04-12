<template>
  <q-card class="my-card">
    <component :is="component" :ref="setComponentRef" :data="data" :type="type"></component>
  </q-card>
</template>

<script setup>
import { defineProps, computed, ref, onMounted } from 'vue'

onMounted(() => {
  // console.log(props.type)
  // console.log(props.data)
})
// 컴포넌트 import
import GatheringFacilitiesCard from '@/components/card/GatheringFacilitiesCard.vue'
import DeliveryCard from '@/components/card/DeliveryCard.vue'
import FloatingPopulationCard from '@/components/card/FloatingPopulationCard.vue'
import SalesCard from '@/components/card/SalesCard.vue'
import AverageCard from '@/components/card/AverageCard.vue'
import ClosingRateCard from '@/components/card/ClosingRateCard.vue'

// props 정의
const props = defineProps({
  data: Object,

  type: String
})

const componentMap = {
  GatheringFacilitiesCard,
  DeliveryCard,
  FloatingPopulationCard,
  SalesCard,
  AverageCard,
  ClosingRateCard
}

const component = computed(() => {
  const selectedComponent = componentMap[props.type]
  if (!selectedComponent) {
    console.error(`Component '${props.type}' not found`)
    return null
  }
  return selectedComponent
})

const componentRef = ref(null)

const setComponentRef = (el) => {
  componentRef.value = el
}

const animation = () => {
  if (componentRef.value && componentRef.value.animation) {
    componentRef.value.animation()
  }
}

defineExpose({
  animation
})
</script>

<style scoped>
.my-card {
  border-radius: 3%;
  width: 100%;
  height: 70svh;
  overflow: hidden;
}
</style>
