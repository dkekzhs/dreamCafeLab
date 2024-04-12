<template>
  <div class="q-pa-md">
    <div class="q-gutter-y-md" style="max-width: 600px">
      <!-- 사용자 정보 및 프로필 카드 -->
      <div class="q-header">
        <span>
          {{ userName }}
        </span>
        님 정보를 한눈에 모아보세요
      </div>
      <q-card class="q-mb-md">
        <div class="q-pa-md q-gutter-x-md row items-center">
          <div class="col-auto">
            <q-avatar size="100px">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
            </q-avatar>
          </div>
          <div class="col">
            <div class="row items-center">
              <div class="nickname-text">{{ userName }}</div>
              <q-icon name="mdi-account-circle" class="q-ml-sm" />
            </div>
            <div class="row items-center q-mt-md">
              <q-badge color="primary" text-color="white">10</q-badge>
              <q-badge color="secondary" text-color="white" class="q-ml-md">20</q-badge>
            </div>
          </div>
        </div>
      </q-card>

      <!-- 주문 내역 및 상권보고서 탭 -->
      <div class="order-text">주문내역 <q-badge color="orange">4</q-badge></div>
      <q-card class="scrab">
        <q-tabs class="scrab-header" v-model="tab" dense active-color="primary" indicator-color="primary">
          <q-tab name="marketReports" label="상권보고서" />
          <q-tab name="simulation" label="시뮬레이션" />
        </q-tabs>

        <q-separator />

        <!-- 상권보고서 및 시뮬레이션 내용 -->
        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="marketReports">
            <div class="text-h6">상권보고서</div>
            rt
          </q-tab-panel>

          <q-tab-panel name="simulation">
            <div class="text-h6">시뮬레이션</div>
            st
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const userName = ref('이름') // 사용자 이름을 여기에 입력하세요
    const tab = ref('marketReports')

    return {
      userName,
      tab
    }
  }
}
</script>
<style scoped>

.scrab {
  box-shadow: none;
}

.scrab .scrab-header {
  /* border-radius: 5% !important; */
  /* border: 1px solid black !important; */
}

.q-panel div {
  background-color: white;
}
.text-primary {
  background-color: #bb8451;
  font-weight: 100;
}

.q-header span {
  border: 10%;
  color: #bb8451;
  margin-right: -5px;
}
.q-header {
  text-align: center;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
}

.nickname-text {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
  text-align: center;

  color: #bb8451;
}

.order-text {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;

  color: #000000;
}
</style>
