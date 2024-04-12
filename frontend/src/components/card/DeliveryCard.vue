<template>
  <div class="background-container">
    <!-- <img src="../../assets/img/paper-back.jpg" class="background-image" /> -->
    <div class="rider">
      <img src="../../assets/img/bike.gif" />
    </div>
    <div class="card-effect">
      <img src="../../assets/img/delivery-back.png" />
    </div>
    <div class="text-subtitle2">{{ author }}</div>
  </div>
</template>

<script setup>
import { onMounted, defineProps } from 'vue'
import gsap from 'gsap'
import MotionPathPlugin from 'gsap/MotionPathPlugin'

// props 정의
const props = defineProps({
  title: String,
  author: String,
  cardColor: {
    type: String,
    default: '#FFFFFF'
  },
  textColor: {
    type: String,
    default: '#000000'
  }
})

// GSAP에 MotionPathPlugin을 등록합니다.
gsap.registerPlugin(MotionPathPlugin)

// animate 함수 정의
const animation = () => {
  // 초기 위치와 투명도 설정
  gsap.set('.rider img', { scale: 7, x: -100, y: 480, opacity: 1 })
  console.log(window.innerWidth)
  // 애니메이션 정의
  gsap.to('.rider img', {
    x: window.innerWidth, // 화면의 오른쪽 끝으로 이동
    duration: 5, // 애니메이션 지속 시간
    ease: 'linear', // 일정한 속도
    repeat: -1, // 무한 반복
    onRepeat: resetPosition // 반복될 때마다 위치 초기화 함수 호출
    // opacity: 0 // 오른쪽 끝에 도달하면 투명도 0으로 설정하여 사라지게 함
  })

  gsap.to('.rider img', {
    duration: 2,
    ease: 'none',
    motionPath: {
      path: [
        { x: 150, y: 100 },
        { x: 180, y: 350 },
        { x: 150, y: 580 },
        { x: 180, y: 580 }
      ],
      curviness: 1.5,
      autoRotate: true
    }
  })
}
// 컴포넌트가 마운트되었을 때 애니메이션을 실행합니다.
onMounted(() => {})
defineExpose({
  animation
})
</script>

<style scoped>
.background-container {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100vh;
}

.background-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.rider img {
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  width: 20px;
  height: 20px;
  opacity: 0;
}

.card-effect img {
  position: absolute;
  top:24svh;
  width: 100%;
}

.rider img {
  width: 80px;
  height: 80px;
}
</style>
