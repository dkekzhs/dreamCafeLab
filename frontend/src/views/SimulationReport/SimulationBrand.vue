<template>
  <q-page class="q-pa-md brand">
    <div class="brand-text-comp"></div>
    <div class="brand-text">
      <BackHeader style="display: inline; margin-left: -20%; margin-right: 10%" /> 선택 위치 기반
    </div>
    <div class="brand-text" style="margin-bottom: 2svh">창업 추천 <span>브랜드</span> 입니다.</div>
    <div class="brand-cards">
      <q-card
        v-for="(card, index) in cards"
        :key="card.id"
        class="card"
        :class="{ selected: card.id === selectedCardId }"
        @click="selectCard(card.id)"
      >
        <div class="brand-card-content">
          <div class="brand-logo">
            <img :src="card.cafeLogo" />
          </div>
          <div class="card-details">
            <div class="card-name">
              {{ card.title }}
              <div class="brand-type">{{ card.brandType }}</div>
            </div>

            <div class="recommendation-reason">
              <div>
                <span>{{ card.description }}</span>
              </div>
              <div>
                인테리어 비용 <span>{{ card.interior }} 원</span>
              </div>
              <div>
                보증 금액 <span>{{ card.franchise }} 원</span>
              </div>
              <div>
                교육 금액<span>{{ card.education }} 원</span>
              </div>
              <div>
                가맹 금액 <span>{{ card.deposit }} 원</span>
              </div>
            </div>
          </div>
        </div>
      </q-card>
    </div>
    <div class="another-brand" @click="showModal">맘에 드는 브랜드가 없나요?</div>
    <!-- 이전 버튼 -->
    <div class="btn-group-brand">
      <button class="next-btn s-brand" @click="nextButton">다음</button>
    </div>

    <q-dialog v-model="modalType" persistent>
      <q-card class="q-pa-md" style="width: 500px; max-width: 90vw">
        <q-card-section class="q-pb-none">
          <div class="text-h6" style="font-weight: bold">카페 정보</div>
        </q-card-section>
        <q-separator />
        <q-card-section>
          <!-- 검색 상자 -->
          <q-input v-model="searchQuery" label="검색" dense />

          <!-- 검색 결과 리스트 -->
          <q-list>
            <q-item v-for="(item, index) in filteredItems" :key="index">
              <q-item-section>{{ item.name }}</q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
        <q-separator />
        <q-card-actions align="right">
          <q-btn class="add-btn" label="닫기" @click="hideModal" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref, onMounted, computed, nextTick } from 'vue'
import { gsap } from 'gsap'
import { useRouter } from 'vue-router'
import { useDataStore } from '@/stores/dataStore'
import { useReportStore } from '@/stores/reportStore'
import BackHeader from '@/components/BackHeader.vue'

const router = useRouter()
const dataStore = useDataStore()
const searchQuery = ref('')
const items = [
  { name: '이디야커피' },
  { name: '엔제리너스' },
  { name: '할리스' },
  { name: '더카페' },
  { name: '투썸플레이스' },
  { name: '카페띠아모' },
  { name: '드롭탑(DROPTOP)' },
  { name: '달.콤(dal.komm)' },
  { name: '카페게이트' },
  { name: '커피에반하다' },
  { name: '더치앤빈' },
  { name: '만랩커피' },
  { name: '메가엠지씨커피(MEGA MGC COFFEE)' },
  { name: '커피온리' },
  { name: '카페인중독' },
  { name: '반달커피' },
  { name: 'Blu Shaak(블루샥)' },
  { name: '하이오커피' },
  { name: '바나프레소' },
  { name: '카페베네' },
  { name: '토프레소' },
  { name: '요거프레소' },
  { name: '핸즈커피 (HANDS COFFEE)' },
  { name: '파스쿠찌' },
  { name: '빽다방' },
  { name: '커피마마' },
  { name: '커피베이' },
  { name: '디에떼에스프레소' },
  { name: '아마스빈' },
  { name: '마시그래이' },
  { name: '더벤티' },
  { name: '컴포즈커피(COMPOSE COFFEE)' },
  { name: '카페봄봄' },
  { name: '더리터(THE LITER)' },
  { name: '청자다방' },
  { name: '베러먼데이' },
  { name: '카페051(cafe051)' },
  { name: '우주라이크(WOULDULIKE)' },
  { name: '감성커피' },
  { name: '달리는커피' },
  { name: '텐퍼센트스페셜티커피' },
  { name: '벌크커피(BULK COFFEE)' },
  { name: '원유로스페셜티커피' },
  { name: '하삼동커피' },
  { name: '나우커피' },
  { name: '카페일분' },
  { name: '디저트 39' },
  { name: '엑스오엑스오 핫도그앤커피' }
]
const numberWithCommas = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
const reportStore = useReportStore()
const filteredItems = computed(() => {
  return items.filter((item) => {
    return item.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  })
})

const modalType = ref(false)
const showModal = () => {
  modalType.value = true
}

const hideModal = () => {
  modalType.value = false
}
const cards = ref([])
const selectedCardId = ref(cards.value.length > 0 ? cards.value[0].id : null)

const selectCard = (id) => {
  console.log(id)
  selectedCardId.value = id
}

const preButton = () => {
  router.back()
}

const nextButton = () => {
  if (selectedCardId.value) {
    dataStore.setSelectedBrandId(selectedCardId.value)

    router.push({ name: 'simulation_asset' })
  } else {
    console.error('No brand selected')
  }
}
const titleReTitle = (value) => {
  return value.split('(')[0].replace(' ', '')
}
const fecthData = async () => {
  await reportStore.getBrandData(dataStore.location[1], dataStore.location[0])
  console.log(reportStore.brandData)
  if (reportStore.brandData.length > 0) {
    cards.value = reportStore.brandData.map((data, index) => ({
      id: data.brandId,
      title: titleReTitle(data.brandName),
      cafeLogo: data.cafeLogo,
      interior: numberWithCommas(data.interiorAmount * 1000),
      franchise: numberWithCommas(data.franchiseAmount * 1000),
      education: numberWithCommas(data.educationAmount * 1000),
      deposit: numberWithCommas(data.depositAmount * 1000),
      brandType: data.brandType
    }))
  }
  selectedCardId.value = cards.value[0].id
}
onMounted(async () => {
  console.log(dataStore.location[0], dataStore.location[1])

  await fecthData()
  await nextTick()

  console.log(reportStore.brandData[0])
  gsap.fromTo(
    '.card',
    { x: '-100%', opacity: 0 },
    { x: '0%', opacity: 1, duration: 1.5, stagger: 0.2, ease: 'power2.out' }
  )
})
</script>

<style scoped>
.btn-group-brand {
  display: flex;
  justify-content: space-between;
  border-radius: 10px;
  position: absolute;
  bottom: 3svh;
  width: 346px;
  height: 40px;
  font-family: 'Inter';
  font-weight: 1000;
  background-color: rgb(217, 204, 189);
}

.btn-group-brand button {
  flex: 1;
}
/* BackHeader의 스타일 코드 */
.back-header {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10; /* BackHeader의 z-index를 더 높게 설정 */
  display: flex;
  align-items: left;
}

.btn-group button {
  flex: 1; /* 버튼이 컨테이너의 높이와 같은 비율로 확장 */
}

.btn-group-brand {
  font-size: 16px;
  color: black;

  outline: none;
  cursor: pointer;
  border: 1px solid black;
  border-radius: 10px;
  overflow: hidden;
}

.next-btn.s-brand {
  top: 7px;
  border: none;
}

.btn-group-brand button {
  background-color: rgb(217, 204, 189);
}

/*
  위에는 버튼 아래는 전체 css
*/

.q-pa-md.brand {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.brand-text-comp {
  width: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 10px;
  letter-spacing: -3px;
}
.brand-text span {
  color: rgb(139, 84, 60);
  /* margin-bottom: 10%; */
}
.brand-text {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-size: 30px;
  line-height: 60px;
  color: #000000;
  margin-bottom: -1svh;
}

.recommend-text-comp {
  margin-bottom: 12px;
}

.recommend-text {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  line-height: 15px;
  color: #000000;
}

.brand-cards {
  width: 100%;
  min-height: auto;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);

  display: flex;
  flex-direction: column; /* 요소들을 세로로 배치합니다. */
}

.card {
  border-radius: 20px;
  height: 200px;
  opacity: 1;
  display: flex;
  margin-bottom: 10px;
  padding: 15px;
}

.card-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding-left: auto;
}
.brand-card-content {
  display: flex;
}
/* 로고를 가운데로 정렬 */
.brand-logo {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 130px;
}

.brand-logo img {
  object-fit: contain;
  height: 70%;
}

.card-name {
  font-weight: 1000;
  font-size: 30px;
  font-family: 'Inter';

  flex: 1;
}
.brand-type {
  font-weight: 700;
  font-size: 15px;
  font-family: 'Inter';
  color: rgb(139, 84, 60);
}
.recommendation-reason div {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 700; /* span 요소에 대해 폰트 굵기를 적용합니다. */
}

.recommendation-reason div span {
  margin-left: auto;
  font-weight: 500;
}

.card:not(.selected) {
  filter: blur(20px);
}

.selected {
  /* transform: scale(1.1); */
}
.another-brand {
  margin-top: 15px;
  font-weight: 1000;
  color: rgb(139, 84, 60);
}

.add-btn {
  font: 1000;
  background-color: rgb(217, 204, 189);
}
</style>
