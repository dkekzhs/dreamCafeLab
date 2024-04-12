<template>
  <Dialog v-if="isDialogVisible" @close="closeDialog" @dialog="handleDialog" />
  <div id="toastMessage" class="toast-message"></div>
  <div id="renderDiv"></div>
</template>

<script>
import { Renderer } from '@/js/renderer.js'
import { onMounted, ref } from 'vue'
import { useDataStore } from '@/stores/dataStore'
import { useSimulationStore } from '@/stores/simulationStore'
import Dialog from '@/components/Dialog.vue'
import '@/assets/main.css' // CSS 파일 import
import settings from '@/js/pref/settings'
import { requestInitialSimul } from '@/js/simulator/fetch/request'
import { CAFE_SIZE } from '@/js/simulator/tile/tileEnum'

export default {
  components: {
    Dialog
  },
  setup() {
    const simData = useSimulationStore()
    simData.simStarted = false

    const dataStore = useDataStore()
    const simulationStore = useSimulationStore()

    const isDialogVisible = ref(true)
    let renderer = ref(null)
    let renderDiv = ref(null)

    const openDialog = () => {
      isDialogVisible.value = true
    }

    const closeDialog = () => {
      isDialogVisible.value = false
    }

    const handleDialog = (dialog) => {
      isDialogVisible.value = dialog
    }

    onMounted(() => {
      renderDiv.value = document.getElementById('renderDiv')
      renderer.value = new Renderer(renderDiv.value, 'render')

      const intervalId = setInterval(() => {
        if (Math.ceil(renderer.value.date - renderer.value.start) > 60 * 60 * 24 * 1000 * 3 * 365) {
          simData.simStarted = true
          isDialogVisible.value = true
          window.simulate.game.button.setPause(true)
          clearInterval(intervalId)
        }
      }, 1000)

      // TODO: brandId도 dataStore의 값과 연결해야 함
      // JSON 객체 생성 및 데이터 채우기
      const simulationRequest = {
        lat: dataStore.location[1],
        lng: dataStore.location[0],
        radius: 500,
        initialPrice: dataStore.investment, // 투자금액
        interestRate: dataStore.rate, // 이자율
        loanAmount: dataStore.loan, // 대출금액
        employees: dataStore.employees,
        cafeSize: dataStore.size,
        brandId: dataStore.brandId,
        // brandId: 1,
        startTime: new Date().toISOString() // 현재 시간 사용
      }
      console.log('simulationRequest')
      console.log(simulationRequest)
      // API로 시뮬레이션 데이터 전송
      sendDataToSimulationAPI(simulationRequest)
    })

    // API 요청 보내기
    async function sendDataToSimulationAPI(simulationRequest) {
      try {
        // API로 데이터 전송하고 결과를 받아옴
        await requestInitialSimul(simulationRequest)
      } catch (error) {
        console.error('Error while sending simulation data:', error)
      }
    }

    const beforeLeave = () => {
      renderer.value = null
      renderDiv.value.innerHTML = ''
      isDialogVisible.value = false
    }

    return {
      isDialogVisible,
      handleDialog,
      openDialog,
      closeDialog,
      beforeLeave
    }
  },

  beforeRouteLeave(to, from, next) {
    // 라우터를 떠날 때 호출되는 라우터 가드
    this.beforeLeave()
    next()
  }
}
</script>
