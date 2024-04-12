<template>
  <q-page class="q-pa-md asset">
    <BackHeader />
    <div class="asset-text-comp">
      <div></div>
      <div class="asset-text"><span>투자 가능 자금</span>은</div>
      <div class="asset-text" style="margin-top: -5%; margin-bottom: 5%">얼마인가요?</div>
      <div class="input-with-unit">
        <input
          type="text"
          class="asset-input"
          v-model="formattedInvestmentAmount"
          @input="formatNumber('asset')"
        />
        <span v-if="investmentAmount"> 만원</span>
      </div>
      <div class="add-asset-btn">
        <q-btn @click="addAsset(1000, 'asset')" class="add-btn">+1,000</q-btn>
        <q-btn @click="addAsset(5000, 'asset')" class="add-btn">+5,000</q-btn>
        <q-btn @click="addAsset(10000, 'asset')" class="add-btn">+10,000</q-btn>
      </div>
      <div class="loan-comp" style="margin-top: 8svh">
        <q-btn @click="toggleLoanInput" class="loan-btn" :icon="loanIcon" />
        <div class="asset-loan-text">{{ loanText }}</div>
      </div>
    </div>
    <div v-if="showLoanInput" class="loan-text-comp">
      <div class="asset-text blurred-text" style="margin-bottom: 5%">
        <span>대출금</span>은 얼마인가요?
      </div>
      <div class="asset-text"></div>
      <div class="loan-comp" v-if="showLoanInput">
        <div class="input-with-unit">
          <input
            type="text"
            class="asset-input"
            v-model="formattedLoanAmount"
            @input="formatNumber('loan')"
          />
          <span v-if="loanAmount">만원</span>
        </div>
      </div>
      <div class="add-asset-btn">
        <q-btn @click="addAsset(1000, 'loan')" class="add-btn">+1,000</q-btn>
        <q-btn @click="addAsset(5000, 'loan')" class="add-btn">+5,000</q-btn>
        <q-btn @click="addAsset(10000, 'loan')" class="add-btn">+10,000</q-btn>
      </div>
      <div class="interest-text"><span>이율</span>은?</div>
      <div class="input-with-unit">
        <q-btn @click="addInterest(-1)" class="add-interest-btn">-1</q-btn>
        <input
          type="number"
          min="0"
          max="30"
          step="3"
          class="interest-input"
          style="width: 20%"
          v-model="interestRate"
          @input="formatNumber('asset')"
        />
        <q-btn @click="addInterest(1)" class="add-interest-btn">+1</q-btn>
        <span class="rate" v-if="interestRate">%</span>
      </div>
    </div>
    <!-- 이전 버튼 -->
    <div class="btn-group asset1">
      <button class="next-btn asset1" @click="goToNext">다음</button>
    </div>
  </q-page>
</template>
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useDataStore } from '@/stores/dataStore'
import { useSimulationStore } from '@/stores/simulationStore'
import BackHeader from '@/components/BackHeader.vue'

const simulation = useSimulationStore()
const { selectBrand, updateRevenueList } = simulation

const showLoanInput = ref(false)
const showLoanText = ref(true)
const loanIcon = ref('add')
const loanText = ref('대출금 추가하기')
const router = useRouter()
const interestRate = ref('4')
const dataStore = useDataStore()

// 기존의 ref 대신에 입력 값을 표시할 때 쓸 formattedInvestmentAmount ref를 사용합니다.
const formattedInvestmentAmount = ref('1,000')
// 기존의 ref 대신에 입력 값을 저장할 때 쓸 investmentAmount ref를 사용합니다.
const investmentAmount = ref(1000)

const formattedLoanAmount = ref('')
const loanAmount = ref(0)

const goToNext = () => {
  if (!validateInputs()) {
    return
  }
  console.log('complete', investmentAmount.value, loanAmount.value, interestRate.value)
  dataStore.setAsset(investmentAmount.value, loanAmount.value, interestRate.value)

  router.push({ name: 'simulation_asset2' })
}

const addInterest = (amount) => {
  interestRate.value = Number(interestRate.value) + amount
  if (interestRate.value < 0) {
    interestRate.value = 0
  } else if (interestRate.value > 20) {
    interestRate.value = 20
  }
}

const addAsset = (amount, type) => {
  if (type === 'asset') {
    formattedInvestmentAmount.value = (
      Number(formattedInvestmentAmount.value.replace(/,/g, '')) + amount
    ).toLocaleString()
    formatNumber('asset')
  } else {
    formattedLoanAmount.value = (
      Number(formattedLoanAmount.value.replace(/,/g, '')) + amount
    ).toLocaleString()
    formatNumber('loan')
  }
}

const validateInputs = () => {
  // 투자금이 숫자로만 구성되었는지 확인
  if (!/^\d+$/.test(investmentAmount.value)) {
    alert('투자금은 숫자로만 입력해야 합니다.')
    return false
  }
  console.log(showLoanInput.value)
  if (!showLoanInput.value) return true
  // 대출금이 숫자로만 구성되었는지 확인
  if (showLoanInput.value && !/^\d+$/.test(loanAmount.value)) {
    alert('대출금은 숫자로만 입력해야 합니다.')
    return false
  }

  // 이율이 숫자로만 구성되었는지 확인
  if (!/^\d+(\.\d+)?$/.test(interestRate.value)) {
    alert('이율은 숫자 또는 소수점으로만 입력해야 합니다.')
    return false
  } else if (Number(interestRate.value) > 20) {
    alert('법정 최고 이율은 30%입니다.')
    return false
  }
  return true
}
const goToBack = () => {
  router.go(-1)
}
const toggleLoanInput = () => {
  showLoanInput.value = !showLoanInput.value
  showLoanText.value = !showLoanInput.value
  if (showLoanInput.value) {
    loanIcon.value = 'remove'
    loanText.value = ''
  } else {
    loanIcon.value = 'add'
    interestRate.value = ''
    loanAmount.value = ''
    formattedLoanAmount.value = ''
    loanText.value = '대출금 추가하기'
    console.log(loanAmount.value)
  }
}

const onlyNumberInput = (event) => {
  // 입력 값이 숫자 또는 소수점인지 확인
  const value = event.target.value
  if (!/^\d*\.?\d{0,2}$/g.test(value)) {
    // 숫자와 소수점 이외의 문자는 제거
    event.target.value = value.replace(/[^\d.]/g, '')
    // 소수점 이후 둘째 자리 이상은 제거
    const decimalIndex = event.target.value.indexOf('.')
    if (decimalIndex !== -1) {
      event.target.value = event.target.value.slice(0, decimalIndex + 3)
    }
  }
}

// 이율이 소수점 둘째 자리까지 입력되도록 하는 함수
const limitDecimalPlaces = (event) => {
  const value = event.target.value
  if (value.includes('.')) {
    const decimalPart = value.split('.')[1]
    if (decimalPart.length > 2) {
      event.preventDefault()
    }
  }
}

// formatNumber 함수는 입력된 값을 천 단위 쉼표가 포함된 문자열로 변환합니다.
const formatNumber = (type) => {
  if (type == 'asset') {
    const value = formattedInvestmentAmount.value.replace(/\D/g, '') // 숫자가 아닌 문자를 제거합니다.
    const formattedValue = value.replace(/\B(?=(\d{3})+(?!\d))/g, ',') // 천 단위 쉼표를 추가합니다.
    formattedInvestmentAmount.value = formattedValue
    investmentAmount.value = Number(value) // 숫자형으로 변환하여 저장합니다.
  } else {
    const value = formattedLoanAmount.value.replace(/\D/g, '') // 숫자가 아닌 문자를 제거합니다.
    const formattedValue = value.replace(/\B(?=(\d{3})+(?!\d))/g, ',') // 천 단위 쉼표를 추가합니다.
    formattedLoanAmount.value = formattedValue

    loanAmount.value = Number(value) // 숫자형으로 변환하여 저장합니다.
  }
}
</script>

<style scoped>
.btn-group.asset1 {
  display: flex;
  border-radius: 10px;
  position: absolute;
  bottom: 3svh;
  width: 90%;
  height: 40px;
  font-family: 'Inter';
  font-weight: 1000;
  background-color: rgb(217, 204, 189);
  justify-content: space-between; /* 버튼 사이의 공간을 최대로 확보 */
}

.btn-group.asset1 button {
  flex: 1; /* 버튼이 컨테이너의 높이와 같은 비율로 확장 */
}

.btn-group.asset1 {
  font-size: 16px;
  color: black;

  outline: none;
  cursor: pointer;
  border: 1px solid black;
  border-radius: 10px;
}

.next-btn.asset1 {
  top: 7px;
  border: none;
}

.btn-group.asset1 button {
  background-color: rgb(217, 204, 189);
}



.input-with-unit {
  display: flex;
  align-items: center;
}

.input-with-unit input {
  font-size: 30px;
  width: 30svh;
  height: 40px; /* 입력창의 높이를 조정합니다. */
  padding: 5px 10px; /* 입력창의 내부 여백을 설정합니다. */
  border-radius: 10px;
  border: 1px solid #ccc; /* 입력창에 테두리를 추가합니다. */
}

.input-with-unit span {
  font-size: 24px; /* 단위의 글꼴 크기를 조정합니다. */
  margin-left: 5px; /* 입력창과 단위 사이의 간격을 조정합니다. */
}

.add-asset-btn {
  width: 100%;
  display: flex;
  justify-content: space-evenly; /* 요소들을 가운데 정렬합니다. */

  margin-top: 3svh; /* 위마진을 띄워줍니다. */
}

.add-asset-btn button {
  /* 버튼 스타일 */
}

.add-btn {
  width: 12svh;
  /* height: 10%; */
  border-radius: 10px;
  background-color: rgba(139, 84, 60, 0.3);
  font-size: 2svh;
  color: black;
}

.add-interest-btn {
  width: 3svh;
  margin: 3%;
  border-radius: 10px;
  background-color: rgba(139, 84, 60, 0.3);
  font-size: 2svh;
  color: black;
}

.loan-comp {
  display: flex;
  align-items: center;
  /* margin-top: 10svh; */
}

.q-pa-md.asset {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: left;
}

.asset-text span {
  color: rgb(139, 84, 60);
}

.asset-text-comp {
  width: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* 왼쪽 정렬을 위해 align-items 속성 수정 */
  margin-top: 10svh;
  letter-spacing: -3px;
}

.asset-text {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-size: 3.3svh;
  line-height: 60px;
  color: #000000;
}

.asset-text span {
  font-weight: 700;
}

.asset-input {
  font-size: 30px;
  width: 150px;
  height: auto;
  color: #000000;
  border-radius: 10px;
}

.asset-input span {
  font-size: 24px; /* 단위의 글꼴 크기를 조정합니다. */
  margin-left: 5px; /* 입력창과 단위 사이의 간격을 조정합니다. */
}

.loan-btn {
  width: 1svh;
  height: 1svh;
  border-radius: 1svh;
  color: #000000;
  background-color: rgb(139, 84, 60, 0.5);
}

.asset-loan-text {
  margin-left: 10px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
  color: #000000;
}

.loan-text-comp span.rate {
  font-size: 30px;
}

.loan-text-comp {
  position: relative;
  width: auto;
  height: auto;
  /* top: 300px; */
  letter-spacing: -3px;
}

.interest-text span {
  font-weight: 1000;
  color: rgb(139, 84, 60);
}

.interest-text {
  margin-top: 10%;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  margin-top: 20px;
  margin-bottom: 10px;
  line-height: 18px;
  color: #000000;
}

.interest-input {
  font-size: 30px;
  margin-top: 5px;
  width: 100px;
  height: auto;
  color: #000000;
  border-radius: 10px;
}
</style>
