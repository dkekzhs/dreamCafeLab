<template>
  <q-page class="q-pa-md asset">
    <BackHeader />
    <div class="asset-text-comp">
      <div class="asset-text">
        <span>어떤 크기의 매장</span>을
        <div style="margin-top: -5%">생각하시는지 알려주세요</div>
      </div>
      <div class="invest-btn-comp">
        <div
          class="invest-btn"
          @click="
            () => {
              selectBtn()
              setCafeSize(10)
            }
          "
        >
          <div class="invest-btn-img">
            <img src="../../assets/so.png" alt="" /><span class="invest-title">소형</span
            ><span>10평</span><span>33 . 05㎡</span>
          </div>
        </div>
        <div
          class="invest-btn"
          @click="
            () => {
              selectBtn()
              setCafeSize(20)
            }
          "
        >
          <div class="invest-btn-img">
            <img src="../../assets/joong.png" alt="" /><span class="invest-title">중형</span
            ><span>20평</span><span>66 . 1㎡</span>
          </div>
        </div>
        <div
          class="invest-btn"
          @click="
            () => {
              selectBtn()
              setCafeSize(30)
            }
          "
        >
          <div class="invest-btn-img">
            <img src="../../assets/dae.png" alt="" /><span class="invest-title">대형</span
            ><span>30평</span><span>99 . 1㎡</span>
          </div>
        </div>
      </div>
    </div>

    <div class="asset-text-comp">
      <div class="asset-text">
        <span>직원 수</span>를 입력하세요
        <p style="font-size: medium; color: gray; margin-top: -10%; margin-bottom: -5%">
          직원은 최대 3명까지 가능합니다.
        </p>
      </div>
      <div class="loan-comp">
        <q-btn @click="addEmployee(-1)" class="add-employee-btn">▼</q-btn>
        <input type="number" class="asset-input" v-model="employees" @change="inputEmployee" />
        <span>명</span>
        <q-btn @click="addEmployee(1)" class="add-employee-btn">▲</q-btn>
      </div>
    </div>
    <!-- 이전 버튼 -->
    <div class="btn-group">
      <button class="next-btn" @click="goToNext">시뮬레이션 시작</button>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useDataStore } from '@/stores/dataStore'
import BackHeader from '@/components/BackHeader.vue'

const router = useRouter()
const dataStore = useDataStore()
const cafeSize = ref('')
const employees = ref(0)

const selectedBtn = ref(null)

const selectBtn = (size) => {
  cafeSize.value = size

  if (selectedBtn.value) {
    selectedBtn.value.classList.remove('selected')
  }
  selectedBtn.value = event.currentTarget
  selectedBtn.value.classList.add('selected')
}

const inputEmployee = (event) => {
  // 입력 값이 숫자 또는 소수점인지 확인
  const value = event.target.value
  if (!/^\d*\.?\d{0,2}$/g.test(value)) {
    // 숫자와 소수점 이외의 문자는 제거
    event.target.value = value.replace(/[^\d.]/g, '')
    // 소수점 이후 둘째 자리 이상은 제거
    const decimalIndex = event.target.value.indexOf('.')
    if (decimalIndex !== -1) {
      event.target.value = event.target.value.slice(0, decimalIndex)
    }
  }

  let num = parseInt(event.target.value)

  if (num > 3 && cafeSize.value == 10) {
    event.target.value = 3
  } else if (num > 5 && cafeSize.value == 20) {
    event.target.value = 5
  } else if (num > 7 && cafeSize.value == 30) {
    event.target.value = 7
  }
}

const goToNext = () => {
  if (!validateInputs()) {
    return
  }
  dataStore.setSize(cafeSize.value)
  dataStore.setEmployees(employees.value)
  console.log(cafeSize.value, employees.value, 'ttt')
  router.push({ name: 'sim_test' })
}

const validateInputs = () => {
  // 투자금이 선택되었는지 확인
  if (!cafeSize.value) {
    alert('카페 크기를 선택해주세요.')
    return false
  }

  if (employees.value <= 0) {
    alert('직원수를 선택해주세요.')
    return false
  }
  return true
}

const goToBack = () => {
  router.go(-1)
}

const setCafeSize = (amount) => {
  cafeSize.value = amount
}

const addEmployee = (amount) => {
  const temp = employees.value + amount
  if (amount == -1 && temp >= 0) {
    employees.value = temp
  } else if (amount == 1 && temp <= 3) {
    employees.value = temp
  }
}
</script>

<style scoped>
.invest-btn.selected {
  background-color: rgba(139, 84, 60, 0.8); /* Change the background color to indicate selection */
  color: white; /* Change text color for better visibility */
  border: 2px solid rgba(139, 84, 60, 1); /* Add border for emphasis */
}

/* Add hover effect for better interactivity */
.invest-btn:hover {
  background-color: rgba(139, 84, 60, 0.8);
  color: white;
  border: 2px solid rgba(139, 84, 60, 1);
}

.btn-group {
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

.invest-title {
  font-size: 20px;
  font-weight: bold;
  margin-top: 10%;
  margin-bottom: 10%;
}

.invest-btn-comp {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.invest-btn {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  width: 100px;
  height: 130%;
  border-radius: 10px;
  background-color: rgb(255, 255, 255) !important;

  font-size: 20px;
  margin-right: 10px;
}

.invest-btn-img {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 20px;
  color: black;
}

.btn-group button {
  flex: 1; /* 버튼이 컨테이너의 높이와 같은 비율로 확장 */
}

.btn-group {
  font-size: 16px;
  color: black;

  outline: none;
  cursor: pointer;
  border: 1px solid black;
  border-radius: 10px;
}

.prev-btn {
  border: none;
  background-color: #6d6d6d;
}
.next-btn {
  top: 7px;
  border: none;
}

.btn-group button {
  background-color: rgb(217, 204, 189);
}


.asset-text span {
  color: rgb(139, 84, 60);
}

.asset-text-comp {
  width: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 20%;
  letter-spacing: -3px;
}

.asset-text {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-size: 30px;
  line-height: 60px;
  color: #000000;
  margin-bottom: 5%;
}

.asset-text span {
  font-weight: 700;
}

.asset-input {
  font-size: 30px;
  width: 50px;
  height: auto;
  color: #000000;
  border-radius: 10px;
  border: none;
}

.invest-btn:hover {
  background-color: rgba(128, 128, 128, 0.8);
}

.add-employee-btn {
  /* width: 50px; */
  font-size: 15px;
  border-radius: 10px;
  background-color: rgb(139, 84, 60, 0.5);
  margin: 10px;
}

.loan-comp span {
  font-size: 20px;
}
</style>
