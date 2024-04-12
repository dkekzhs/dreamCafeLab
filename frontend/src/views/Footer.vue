<template>
  <q-footer class="footer">
    <q-toolbar class="footer-toolbar">
      <div class="home-button">
        <button @click="goToHome"><img src="../assets/img/footer/home.png" alt="홈" /></button>
        <p>홈</p>
      </div>
      <div class="coffee-button">
        <button @click="goToOrder"><img src="../assets/img/footer/coffee.png" alt="창업하기" /></button>
        <p>주문하기</p>
      </div>
      <div class="my-info-button">
        <button @click="goToMyProfile"><img src="../assets/img/footer/my-info.png" alt="내 정보" /></button>
        <p>내정보</p>
      </div>
    </q-toolbar>
  </q-footer>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

const goToHome = () => {
  router.push('/')
}

const goToOrder = () => {
  router.push('/about')
}


const goToMyProfile = () => {
  router.push('/profile')
}

</script>

<style scoped>
.footer {
  border-top: 1px solid black;

  height: 7svh;
  background-color: white;
}

.footer-toolbar {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.footer-toolbar button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100px;
  margin: 0;
  padding: 0;
}

/* 이미지 크기 통일 */
.footer-toolbar button img {
  margin-top: 4px;
  width: 40px;
  height: 40px;
}

.footer-toolbar p {
  margin: 0;
  padding: 0;
  font-size: 14px;
  font-family: 'Inter', sans-serif; /* Inter 글꼴 적용 */
  color: #dadada;
  text-align: center;
}
</style>
