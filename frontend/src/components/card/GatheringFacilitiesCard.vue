<template>
  <div class="q-pa-md gathering">
    <div class="card-design" :class="{ flipped: isVisible }">
      <div class="card front card-design">
        <div class="card-main-text-comp">
          <div class="card-main-text">상권 대표 시설은</div>
          <div class="card-main-text">
            <span> {{ facility }} </span>
          </div>
        </div>
        <div class="card-img-comp">
          <img :src="isGatheringImage" ref="schoolGif" />
          <div class="card-img-text">
            서울 {{ facility }} 수 <span>상위 {{ facilityTypeValue.toFixed(2) }}%</span>
          </div>
        </div>

        <div class="card-report-text">
          <span>{{ target }}</span> 맞춤형 커피가 어울릴 거 같아요 !
        </div>
        <div class="card-sub-text-comp">
          <div class="card-sub-text">
            ※ 이 상권에 <span>{{ facilityCount }}개</span> {{ facility }}가 위치해요.
          </div>
        </div>
      </div>
      <div class="card back">
        <div id="main gathering" style="width: 100%; height: 400px" ref="chartDom"></div>
        <div class="card-report-title">분석 내용</div>
        <div class="card-report-text">
          <div>
            이 상권에서 <span>{{ facility }}</span
            >이(가) 대표 돼요.
          </div>
          <div>대표 시설과 개수는 다를 수 있습니다.</div>
          <div></div>
          <div>{{ faciltyResult }}</div>
        </div>

        <div class="card-sub-text-comp">
          <div class="card-sub-text">※ 상위 <span>항목</span>만 포함돼있습니다.</div>
        </div>
      </div>
    </div>
    <button class="detail-btn" @click="toggleVisibility">
      <img src="../../assets/img/total/detail-btn.png" />
      {{ isVisible ? '분석 보기' : '돌아 가기' }}
    </button>
  </div>
</template>
<script setup>
import { onMounted, ref, nextTick, watch } from 'vue'
import { gsap } from 'gsap'
import * as echarts from 'echarts'
const { data, type } = defineProps({
  data: {
    type: Object,
    required: true
  },
  type: {
    type: String,
    required: true
  }
})

const {
  facilityType,
  facilityTypeValue,
  apartment,
  bank,
  busStop,
  hospital,
  hotel,
  pharmacy,
  publicOffice,
  school,
  smallTheater,
  subway,
  theater,
  university
} = data
const ftype = {
  No_facility: { value: 0, name: '시설 x' },
  bank: { value: bank, name: '은행' },
  bus_stop: { value: busStop, name: '버스정류장' },
  subway: { value: subway, name: '지하철역' },
  apartment: { value: apartment, name: '아파트' },
  hotel: { value: hotel, name: '숙박업소' },
  school: { value: school, name: '학교' },
  university: { value: university, name: '대학교' },
  small_theater: { value: smallTheater, name: '소극장' },
  theater: { value: theater, name: '영화관' },
  hospital: { value: hospital, name: '병원' },
  public_office: { value: publicOffice, name: '관공서' },
  pharmacy: { value: pharmacy, name: '약국' }
}
const ttype = {
  bank: { value: '직장인' },
  bus_stop: { value: '유동 인구' },
  subway: { value: '유동 인구' },
  apartment: { value: '주민들' },
  hotel: { value: '여행객' },
  school: { value: '학생들' },
  university: { value: '대학생' },
  small_theater: { value: '유동 인구' },
  theater: { value: '유동 인구' },
  hospital: { value: '의료종사자/환자' },
  public_office: { value: '직장인' },
  pharmacy: { value: '직장인' },
  No_facility: { value: '모든 인구' }
}

const itype = {
  No_facility: { value: '/src/assets/img/card/gathering-card/no_facility.gif' },
  bank: { value: '/src/assets/img/card/gathering-card/bank.gif' },
  bus_stop: { value: '/src/assets/img/card/gathering-card/bus_stop.gif' },
  school: { value: '/src/assets/img/card/gathering-card/school.gif' },
  university: { value: '/src/assets/img/card/gathering-card/university.gif' },
  small_theater: { value: '/src/assets/img/card/gathering-card/small_theater.gif' },
  theater: { value: '/src/assets/img/card/gathering-card/theater.gif' },
  hospital: { value: '/src/assets/img/card/gathering-card/hospital.gif' },
  public_office: { value: '/src/assets/img/card/gathering-card/public_office.gif' }
}

const isGatheringImage = ref(itype[facilityType].value)
const facility = ref(ftype[facilityType].name)
const facilityCount = ref(ftype[facilityType].value)
const chartDom = ref(null)
const target = ref(ttype[facilityType].value)
let myChart = null
const ft = Object.values(ftype).filter((item) => item.value !== 0)
const faciltyResult = ref('')
// 값에 따라 내림차순으로 정렬
ft.sort((a, b) => a.value - b.value)
console.log(ft)
const top5 = ref([])
top5.value = ft.slice(0, 6)
const topF = top5[-1]
// top5를 감시하고 변경될 때마다 setReport 함수 호출
watch(top5, () => {
  setReport()
})
const setReport = () => {
  if (top5[4].name === facility) {
    faciltyResult.value = '대표되는 시설과 개수가 많은 시설이 같네요 !'
  } else {
    faciltyResult.value = '대표되는 시설과 개수가 많은 시설은 다를 수 있어요 !'
  }
}
const option = {
  backgroundColor: 'rgba(0, 0, 0, 0)', // 투명색 배경
  title: {
    text: '집객시설 현황',
    left: 'center',
    top: 10,
    textStyle: {
      fontSize: '30px',
      color: 'black',
      fontWeight: 'bold'
    }
  },
  tooltip: {
    trigger: 'item'
  },
  visualMap: {
    show: false,
    min: 80,
    max: 600,
    inRange: {
      colorLightness: [0.2, 0.8]
    }
  },
  series: [
    {
      name: '시설',
      type: 'pie',
      radius: '55%',
      center: ['50%', '50%'],
      data: top5.value,
      roseType: 'radius',
      label: {
        color: 'black', // 검정색
        fontSize: 15 // 글자 크기
      },
      labelLine: {
        lineStyle: {
          color: 'black'
        },
        smooth: 0.5,
        length: 15,
        length2: 10
      },
      itemStyle: {
        color: '#c23531',
        shadowBlur: 200,
        shadowColor: 'rgba(1, 01, 10, 0.5)'
      },
      animationType: 'scale',
      animationEasing: 'elasticOut',
      animationDelay: function (idx) {
        return Math.random() * 200
      }
    }
  ]
}

const isVisible = ref(false)
const schoolGif = ref(null)
let tl = null

const toggleVisibility = () => {
  isVisible.value = !isVisible.value
  if (!isVisible.value) {
    nextTick().then(() => {
      animation()
    })
  } else {
    nextTick().then(() => {
      if (myChart != null && myChart.dispose) {
        myChart.dispose()
      }
      myChart = echarts.init(document.getElementById('main gathering'))
      myChart.setOption(option)
    })
    if (tl) {
      tl.kill()
    }
  }
}

const animation = () => {
  tl = gsap.fromTo(
    schoolGif.value,
    {
      opacity: 0,
      scale: 0.5,
      filter: 'blur(20px)'
    },
    {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      duration: 1.5,
      ease: 'power2.out'
    }
  )
  gsap.fromTo(
    '.card-img-text span',
    {
      opacity: 0,
      y: 20
    },
    {
      opacity: 1,
      y: 0,
      duration: 3,
      ease: 'power2.out',
      stagger: 1
    }
  )
}
// 마운트 될 때 애니메이션 실행
onMounted(() => {
  console.log(top5)
})
defineExpose({
  animation
})
</script>
<style scoped>
.card-design {
  height: 100%;
  perspective: 1000px; /* 3D 변환을 위한 원근 거리 설정 */
}

.card {
  position: absolute;
  width: 100%;
  height: 100%;
  transition: transform 0.5s;
  transform-style: preserve-3d; /* 3D 변환을 유지하여 자식 요소를 3D 공간에 배치 */
}

.front,
.back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden; /* 뒷면 숨김 */
}

.front {
  background-color: #ffffff;
}

.back {
  transform: rotateY(180deg); /* 뒷면 회전 */
}

.flipped .front {
  transform: rotateY(-180deg); /* 앞면 회전 */
}

.flipped .back {
  transform: rotateY(0deg); /* 뒷면 회전 */
}

.q-pa-md.gathering {
  height: 100%;
  position: relative;
  overflow: hidden;
}
.card-design {
  height: 100%;
}
.detail-btn {
  background-image: linear-gradient(to right, #d9ccbd, #efe9d9);
  position: absolute;
  bottom: 1svh;
  right: 2svw;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #efe9d9;
  border: 2px solid black;
  border-radius: 20px;
  padding: 5px 15px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.detail-btn img {
  height: 30px; /* 이미지 높이 설정 */
  margin-right: 5px; /* 이미지와 텍스트 사이 간격 조절 */
}

.detail-btn:hover {
  background-color: rgba(255, 255, 255, 0.1); /* 마우스 오버 시 배경색 변경 */
}

.card-img-comp {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 10%;
}
.card-main-text-comp {
  margin-top: 5%;
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: left;
  /* margin-left: 30px;  */
}

.card-main-text {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-size: 30px;
  line-height: 45px;
  letter-spacing: -3px;
  color: #000000;
}
.card-report-text div span {
  font-weight: 900;
  color: rgb(139, 84, 60);
  font-size: 20px;
}
.card-main-text span {
  font-weight: 900;
  color: rgb(139, 84, 60);
  font-size: 20px;
}
.card-main-text-inner {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.card-main-text span {
  font-weight: 900;
  color: rgb(139, 84, 60);
  font-size: 43px;
}
.card-img-comp img {
  width: 80%;
}
.card-img-text {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 22px;
  color: #000000;
}
.card-img-text span {
  font-size: 23px;
  font-weight: 1000;
  letter-spacing: -3px;
  color: rgb(139, 84, 60);
}
.card-sub-text-comp {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  text-align: left;
  margin-top: 5%;
}
.card-sub-text {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  line-height: 30px;

  color: gray;
}
.card-sub-text span {
  font-weight: 1000;
  color: rgb(139, 84, 60);
  font-size: 20px;
}
.card-report-text span {
  font-weight: 1000;
  color: rgb(139, 84, 60);
  font-size: 20px;
}
.card-report-text {
  font-weight: bold;
  font-size: 17px;
  padding: 10px;
  line-height: 26px;
  letter-spacing: -2px;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 그림자 효과를 추가합니다. */
}
.card-report-title {
  font-family: 'Inter';
  font-weight: bold;
  font-size: 24px;
  margin-bottom: 10px;
  color: #333;
}
</style>
