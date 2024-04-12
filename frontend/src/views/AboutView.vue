<template>
  <q-page class="q-pa-md">
    <div id="demo">
      <div class="comp">
        <div class="m-comp">
          <div class="m-title-comp">
            <div class="m-title">카페 창업을</div>
            <div class="m-title">고민하세요?</div>
          </div>

          <div class="b-comp">
            <div class="b-body">
              <span> 커피 한 잔 </span>
              주문하듯,
            </div>
            <div class="b-body">간단하게 알려드려요!</div>
          </div>
        </div>
        <div class="image-container">
          <img src="../assets/img/home/MQC.gif" />
        </div>
      </div>

      <!-- <div id="quote">여기 다방 차리는 거 어때?</div> -->

      <div class="button-container">
        <button @click="goToSangReport">
          <div class="div-content">
            <div class="btn-title"><span style="color: rgb(60, 84, 139)">상권</span> 정보</div>
            <div class="btn-title">알아보기</div>
            <img src="../assets/img/aboutview/map-polygon.png" class="btn-map" />
          </div>

          <div class="btn-img1">
            <img src="../assets/img/aboutview/polygon.png" />
          </div>
          <div class="btn-body">상권별 창업 추천 프랜차이즈와 상권 분석 정보를 알려드려요.</div>
        </button>
        <button @click="goToSimulation">
          <div class="div-content">
            <div class="btn-title"><span style="color: rgb(139, 84, 60)">위치</span> 기반</div>
            <div class="btn-title">창업하기</div>
            <img src="../assets/img/aboutview/map-pin.png" class="btn-pin" />
          </div>

          <div class="btn-img2">
            <img src="../assets/img/aboutview/polygon.png" />
          </div>
          <div class="btn-body">
            서울 내 어디든, 원하는 위치에서 카페 창업 후 3년을 예측해 드려요.
          </div>
        </button>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap' // GSAP import

const router = useRouter()

const quote = ref(null)

const goToSangReport = () => {
  router.push('/sang_report')
}

const goToSimulation = () => {
  router.push('/simulation/map')
}

onMounted(() => {
  const spans = document.querySelectorAll('#quote')
  gsap.from(spans, {
    duration: 3, // 애니메이션 지속 시간
    x: '-100vw', // 시작 위치를 화면 왼쪽 밖으로 설정
    ease: 'power3.out', // 애니메이션 효과 조절 (부드럽게 끝나는 효과)
    stagger: 0.02 // 각 요소의 애니메이션 시작 시간을 조금씩 지연
  })
})
</script>

<style scoped>
.m-title-comp {
}
.image-container {
  position: absolute;
  right: -5%;
  top: 50%;
  transform: translateY(-50%);
  max-width: 200px;
}

.comp {
  position: relative;
}
.m-comp {
  padding: 4svh;
  margin-top: 6svh;
  margin-bottom: 3svh;
}
.b-comp {
  margin-top: 20px;
}

.image-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.image-container img {
  max-width: 200px;
}

.button-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 35px; /* 버튼 사이의 간격 */
}

button {
  padding: 20px;
  position: relative; /* 부모 요소에 position: relative; 추가 */
  width: 313px;
  height: 191px;
  /* background: rgb(217, 204, 189); */
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px; /* 버튼 내부 텍스트 간의 간격 */
}

.div-content {
  display: flex;
  flex-direction: column;
}

.m-title {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 1000;
  font-size: 37px;
  line-height: 45px;
  letter-spacing: -3px;
  color: rgb(139, 84, 60);
}

.b-body span {
  color: rgb(139, 84, 60);
}
.b-body {
  letter-spacing: -2px;
  margin-top: px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 25px;
}
.btn-img1,
.btn-img2 {
  position: absolute;
  width: 45px;
  height: 20px;
  right: 0;
}

.btn-img1 img,
.btn-img2 img {
  max-height: 100%; /* 이미지 최대 높이 설정 */
}
.btn-title,
.btn-body {
  font-family: 'Inter', sans-serif;
  text-align: left;
}
.btn-title span {
  color: rgb(139, 84, 60);
}
.btn-title {
  font-weight: 700;
  color: black;
  font-size: 30px;
  line-height: 34px;
}

.btn-body {
  font-weight: 500; /* 더 얇게 */
  font-size: 15px;
  line-height: 24px;
  letter-spacing: -1px;
  color: #676767;
}
.btn-map {
  position: absolute;
  height: 55%;
  top: 0;
  right: 10%;
}
.btn-pin {
  position: absolute;
  height: 50%;
  top: 0;
  right: 10%;
}
</style>
