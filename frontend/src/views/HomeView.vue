<template>
  <q-page class="q-pa-md home">
    <div class="video-background">
      <video ref="videoElement" playsinline loop muted>
        <source src="../assets/img/test/dream-coffee.mp4" type="video/mp4" />
      </video>
    </div>
    <button @click="toggleMute" class="profile-login mute">
      <img v-if="isMuted" src="../assets/img/home/mute.png" alt="음소거 아이콘" />
      <img v-else src="../assets/img/home/no_mute.png" alt="음소거 해제 아이콘" />
    </button>
    <div class="button-wrapper">
      <button @click="goToLogin" class="profile-login">
        <img src="../assets/img/footer/coffee.png" /> 주문하기
      </button>
    </div>
  </q-page>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'

const router = useRouter()
const videoElement = ref(null)
const isMuted = ref(true)

const toggleMute = () => {
  if (videoElement.value) {
    videoElement.value.muted = !videoElement.value.muted
    isMuted.value = videoElement.value.muted
  }
}
const enableSound = () => {
  if (videoElement.value) {
    videoElement.value.muted = false
  }
}

const startVideo = () => {
  if (videoElement.value) {
    videoElement.value.play().catch((error) => {
      console.error('Error starting video:', error)
    })
  }
}

const goToLogin = () => {
  router.push('/about')
}

onMounted(() => {
  startVideo()
  // enableSound()
})
</script>

<style scoped>
.q-pa-md.home {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.video-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

.video-background video {
  min-width: 100%;
  min-height: 100%;
  object-fit: cover; /* 비디오를 화면 크기에 맞게 확대하여 가득 채움 */
}

.button-wrapper {
  position: relative;
  z-index: 2; /* Ensure button is above video */
  align-self: center;
  margin-top: auto;
}

.profile-login {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  padding: 5px 10px;
  background-color: inherit;
  background: rgb(217, 204, 189);
  border: 1px solid black;
  border-radius: 10px;
  font-family: 'NanumSquare', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 23px;
  line-height: 18px;
  color: black;
}

.profile-login img {
  height: 50px;
}
.profile-login.mute {
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  background-color: inherit;
  z-index: 1;
}
</style>
