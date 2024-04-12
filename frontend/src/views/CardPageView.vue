<template>
  <q-page class="q-pa-md cardview" :style="{ backgroundColor: backgroundColor }">
    <div class="seleceted-sg-text-comp" style="display: flex; justify-content: space-between">
      <div class="selected-sg-text">{{ sgName }}</div>
      <span class="temp"> 상권 보고서</span>
      <div class="selected-page">
        <span style="color: rgb(139, 84, 60)">{{ curPage }}</span> / 5
      </div>
    </div>

    <div class="cards">
      <div
        v-if="dataLoading"
        v-for="(card, index) in cards"
        :key="index"
        class="card-wrapper card"
        :class="{ 'last-card': index === cards.length - 1, show: index === curPage - 1 }"
      >
        <Card :type="card.type" :data="card.data" :ref="(el) => (cardRefs[index] = el)" />
        {{ card.content }}
      </div>
    </div>
    <div></div>
    <button class="simulationBtn" :class="{ show: showButton }" @click="goToSimulation">
      돌아 가기
    </button>
  </q-page>
</template>

<script setup>
import { ref, onMounted, nextTick, watch } from 'vue'
import { useRouter } from 'vue-router'
import gsap from 'gsap'
import Card from '@/components/card/Card.vue'
import { useReportStore } from '@/stores/reportStore'
const backgroundColor = ref('rgba(0, 0, 0, 0.5)') // 초기 배경색 설정

const dataLoading = ref(false)
const router = useRouter()
const { params } = router.currentRoute.value
const sang = params.code
const curPage = ref(1)
const showButton = ref(false)
const reportStore = useReportStore()
const sgName = ref('')
const cardRefs = ref({})
const cards = ref([
  { type: 'ClosingRateCard' },
  { type: 'FloatingPopulationCard' },
  { type: 'AverageCard' },
  { type: 'SalesCard' },
  { type: 'GatheringFacilitiesCard' }
])

onMounted(async () => {
  await fetchData()
  dataLoading.value = true
  nextTick(() => {
    cardAnimationSetting()
  })
})

const fetchData = async () => {
  await reportStore.getReportCardData(sang)
  await convertDataToCards(reportStore.reportCardData)
  sgName.value = reportStore.reportCardData.districtName
}

const convertDataToCards = async (data) => {
  cards.value = [
    {
      data: data.closingRateCard,
      type: 'ClosingRateCard'
    },
    {
      data: data.averageCard,
      type: 'AverageCard'
    },
    {
      data: data.gatheringFacilitiesCard,
      type: 'GatheringFacilitiesCard'
    },
    {
      data: data.floatingPopulationCard,
      type: 'FloatingPopulationCard'
    },
    {
      data: data.salesCard,
      type: 'SalesCard'
    }
  ]

  return cards.value
}

const goToSimulation = () => {
  router.push({ name: 'about' })
}

const cardAnimationSetting = () => {
  const cardElements = gsap.utils.toArray('.card-wrapper')

  // Intersection Observer 콜백 함수 정의
  const observerCallback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // 뷰포트에 들어온 카드의 인덱스 찾기
        const index = cardElements.indexOf(entry.target)
        console.log(cardRefs.value)
        if (cardRefs.value[index]) {
          cardRefs.value[index].animation()
        }

        curPage.value = index + 1
        if (index === cardElements.length - 1) {
          showButton.value = true
        } else {
          showButton.value = false
        }
      }
    })
  }

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
  }

  const observer = new IntersectionObserver(observerCallback, observerOptions)

  cardElements.forEach((card) => {
    observer.observe(card)
  })
}
/*
  cur page로 하면 될 듯
*/

// curPage가 변경될 때마다 changeBackgroundColor 함수 실행
watch(curPage, (newValue) => {
  // changeBackgroundColor(newValue)
})

const changeBackgroundColor = (index) => {
  console.log(index)
  switch (index) {
    case 1:
      backgroundColor.value = 'red'
      break
    case 2:
      backgroundColor.value = 'orange'
      break
    case 3:
      backgroundColor.value = 'yellow'
      break
    case 4:
      backgroundColor.value = 'green'
      break
    default:
      backgroundColor.value = 'rgba(0, 0, 0, 0.5)'
  }
}
</script>

<style scoped>
.cardview {
  background: linear-gradient(to bottom, #efe9d9, rgba(161, 149, 120, 1));
  height: 100%;
  /* padding-bottom: 10svh; */
}
.card {
  width: 100%;
}

@media screen and (max-width: 480px) {
  .card {
    width: 100%;
    scroll-snap-align: start;
    padding-top: 2svh;
    padding-left: 1svh;
    padding-right: 1svh;
    padding-bottom: 8svh;
  }
  .cards {
    scroll-snap-type: y mandatory;
    overflow-y: scroll;
    height: 90svh;
  }
}
.simulationBtn {
  position: fixed;
  bottom: 5px;
  left: 0;
  font-weight: 1000;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  width: 80%;
  padding: 15px 0;
  border-radius: 20px;

  background-color: rgb(217, 204, 189);
  z-index: 2;
  opacity: 0;
  transition: opacity 0.5s ease;
  color: black;
}

.simulationBtn.show {
  opacity: 1;
}
.seleceted-sg-text-comp {
  margin-top: 20px;
  border-radius: 10px;
  align-items: center;
  font-size: 35px;
}
.seleceted-sg-text-comp .temp {
  font-size: 15px;
  font-weight: 1000;
}
.selected-sg-text {
  margin-left: 3svw;
  font-family: 'Inter';
  letter-spacing: -3px;
  font-weight: 1000;
}
.selected-page {
  margin-right: 3svw;
  font-size: 20px;
  font-weight: 700;
}
</style>
