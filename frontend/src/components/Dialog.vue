<template>
  <div class="dialog">
    <div class="dialog-content">
      <div v-if="!simData.simStarted">
        <p>
          선택하신 위치에서<br />
          {{ simData.input.cafeSize }}평 크기의 <b>{{ simData.selectBrand.brandName }}</b
          >을(를) 창업하기 위해선<br />
          <b>{{ simData.initPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}원</b>이
          필요해요.<br />
        </p>
        <p>
          상단의 <b>아이콘 버튼</b>들을 이용하여, 예측되는 상황에 맞추어
          <b>집객시설의 유치를 반영</b>하거나/<b>직원 수를 증감</b>할 수 있습니다.<br />
        </p>
        <p>우측 상단의 <b>시작 버튼▶ </b>을 누르면 시작할 수 있습니다.<br/></p>
        <p>성공적인 창업이 되길 응원할게요! 🍀</p>
      </div>
      <div v-else>
        <p
          v-if="
            simData.total_operating_profit[0] +
              simData.total_operating_profit[1] +
              simData.total_operating_profit[2] >=
            0
          "
        >
          3년간의 창업 시뮬레이션 결과, 총
          {{
            (
              simData.total_operating_profit[0] +
              simData.total_operating_profit[1] +
              simData.total_operating_profit[2]
            )
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          }}원의 순이익이 발생했어요.<br />
          상세 내용이 궁금하신가요?<br />
          다음 페이지에서 확인하실 수 있어요.
        </p>
        <p v-else>
          3년간의 창업 시뮬레이션 결과, 총
          <b
            >{{
              (
                simData.total_operating_profit[0] +
                simData.total_operating_profit[1] +
                simData.total_operating_profit[2]
              )
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            }}원</b
          >의 손해가 발생했습니다.<br />
          상세 내용이 궁금하신가요?<br />
          다음 페이지에서 확인하실 수 있어요.
        </p>
      </div>
      <!-- <button @click="routerToSimResult" v-if="simData.simStarted">분석 보고서로 넘어가기</button> -->
      <q-btn color="primary" @click="routerToSimResult" v-if="simData.simStarted"
        ><b>분석 보고서</b> 보러 가기</q-btn
      >
      <!-- <button @click="close" v-else>닫기</button> -->
      <q-btn color="primary" @click="close" v-else>닫기</q-btn>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { useDataStore } from '@/stores/dataStore'
import { useSimulationStore } from '@/stores/simulationStore'
import { getCurrentInstance } from 'vue'
import { INIT_SETTING } from '@/js/simulator/tile/tileEnum'

export default {
  name: 'Dialog',
  setup() {
    const simData = useSimulationStore()
    const dataStore = useDataStore()

    const router = useRouter()
    const instance = getCurrentInstance()

    const routerToSimResult = () => {
      // 1 updateLog 채우기
      simData.setUpdateLog(window.simulate.game.tileManager.updateLog)
      // 2 집객시설 타입별 개수 리스트 채우기
      let numOfFacilityList = []
      for (let i = 0; i < INIT_SETTING.TYPE_OF_FACILITIES; ++i) {
        numOfFacilityList.push([i + 1, window.simulate.game.tileManager.numOfFacilityPerType[i][1]])
      }
      simData.setNumOfFacilityPerType(numOfFacilityList)
      // 3 시뮬 보고서 페이지로 라우팅
      console.log('hi')
      router.push('/simulation_poly_file')
    }

    const open = () => {
      instance.emit('dialog', true)
    }

    const close = () => {
      console.log(':) It is working')
      instance.emit('dialog', false)
    }
    return {
      simData,
      close,
      open,
      routerToSimResult
    }
  }
}
</script>

<style scoped>
.dialog {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* 반투명한 배경 */
  display: flex;
  justify-content: center;
  align-items: center;
}

.dialog-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
}
</style>
