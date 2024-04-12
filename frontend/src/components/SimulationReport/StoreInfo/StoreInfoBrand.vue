<script setup>
import { onMounted, ref, defineProps, defineEmits } from 'vue'
import 'animate.css/animate.min.css'
import { useSimulationStore } from '@/stores/simulationStore.js'
import Detail from './StoreInfoBrandDetail.vue'

const simulation = useSimulationStore()
const { selectBrand, input } = simulation

const brandLogoPath = selectBrand.cafeLogo
const brand_type = selectBrand.brandType
const brand_name = selectBrand.brandName
const average_sales = selectBrand.averageSale
const detail_contents = ref([false, false, false])

const datail0 = [
  { name: '채무보증계약 여부', content: selectBrand.debtGranteeContractYn ? '있음' : '없음' },
  { name: '연장 계약 여부', content: selectBrand.extendedContractYear + ' 년' },
  { name: '최초 계약 여부', content: selectBrand.firstContractYear + '년' },
  { name: '보험 여부', content: selectBrand.insuranceYn ? '있음' : '없음' },
  { name: '최초 계약 년수', content: selectBrand.firstContractYear + ' 년' }
]

const detail1 = [
  { name: '인테리어 비용', content: numberWithCommas(selectBrand.interiorAmount * 1000) + ' 원' },
  { name: '보증 금액', content: numberWithCommas(selectBrand.guaranteedAmount * 1000) + ' 원' },
  { name: '교육 금액', content: numberWithCommas(selectBrand.educationAmount * 1000) + ' 원' },
  { name: '가맹 금액', content: numberWithCommas(selectBrand.franchiseAmount * 1000) + ' 원' }
]

const detail2 = [
  { name: '전체 가맹점 수', content: selectBrand.merchantStoreCount + ' 개' },
  { name: '신규 점포수', content: selectBrand.newFranchiseRegistCount + ' 개' },
  { name: '계약 해지 수', content: selectBrand.cancelContractCount + ' 개' }
]

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

function is_detail_contents(index) {
  detail_contents.value.forEach((value, i) => {
    if (i !== index) {
      detail_contents.value[i] = false
    }
  })
  detail_contents.value[index] = !detail_contents.value[index]
}

onMounted(() => {
  console.log('mounted')
  console.log('selectBrand', selectBrand)
})
</script>

<template>
  <div class="cardDetailContainer" id="cdc">
    <!-- <a href="/store_info" style="width: 30px">X</a> -->
    <p @click="$emit('close', false)" class="close">X</p>
    <span>브랜드 정보</span>
    <div>
      <div class="title">
        <img :src="`${brandLogoPath}`" alt="" />
        <div>{{ brand_type }}</div>
        <span>{{ brand_name }}</span>
      </div>
      <div class="price">
        <div class="sales">
          <p style="color: #9999; margin-bottom: -15%;">창업 후 3년<p style="color: black;">평균 매출</p></p>
          
        </div>
        <span>{{ numberWithCommas(average_sales * 1000) }}원</span>
      </div>
      <div class="contents">
        <hr />
        <div class="content" @click="is_detail_contents(0)">
          <span>계약 정보</span>
          <div class="button" v-if="!detail_contents[0]">▼</div>
          <div
            class="button"
            style="color: gray"
            v-if="detail_contents[0]"
            @click="is_detail_contents(0)"
          >
            ▲
          </div>
        </div>
        <div class="content_detail" v-if="detail_contents[0]">
          <Detail v-for="item in datail0" :id="item" :name="item.name" :content="item.content" />
        </div>
        <hr />
        <div class="content" @click="is_detail_contents(1)">
          <span>비용 정보</span>
          <div class="button" v-if="!detail_contents[1]">▼</div>
          <div
            class="button"
            style="color: gray"
            v-if="detail_contents[1]"
            @click="is_detail_contents(1)"
          >
            ▲
          </div>
        </div>
        <div class="content_detail" v-if="detail_contents[1]">
          <Detail v-for="item in detail1" :id="item" :name="item.name" :content="item.content" />
        </div>
        <hr />
        <div class="content" @click="is_detail_contents(2)">
          <span>점포 정보</span>
          <div class="button" v-if="!detail_contents[2]">▼</div>
          <div
            class="button"
            style="color: gray"
            v-if="detail_contents[2]"
            @click="is_detail_contents(2)"
          >
            ▲
          </div>
        </div>
        <div class="content_detail" v-if="detail_contents[2]">
          <Detail v-for="item in detail2" :id="item" :name="item.name" :content="item.content" />
        </div>
      </div>
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

.close {
  margin: 20px;
  margin-bottom: 0%;
  font-size: large;
}

.sales {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.cardDetailContainer span {
  margin: 2px;
  font-size: 30px;
  font-weight: bold;
  display: flex;
  justify-content: center;
}

img {
  width: 150px;
  height: 150px;
}

.title {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.price {
  display: flex;
  flex-direction: column;
  align-items: start;
  padding: 15px;
}

.contents {
  display: flex;
  flex-direction: column;
  align-items: start;
  /* padding: 15px; */
}

hr {
  width: 100%;
  /* border: 0.5px solid #000000; */
}

.contents span {
  font-size: 20px;
  font-weight: bold;
  margin: 10px;
  align-items: start;
}

.content {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 1svh;
  width: 100%;
}

.content_detail {
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 100%;
  /* padding: 15px; */
}

.button {
  font-size: 20px;
  font-weight: bold;
  margin: 10px;
  align-items: start;
}
</style>
