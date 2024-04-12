<template>
  <q-card class="my-card">
    <div class="profile-text-comp">
      <div class="profile-text">어서오세요</div>
      <div class="profile-text"><span>요다방</span> 입니다</div>
    </div>

    <button @click="goToLogin" class="profile-login">
      <img src="../../assets/img/footer/coffee.png" /> 주문하기
    </button>

    <div class="image-container">
      <img src="../../assets/img/homeview/main-hand-yoda.png" alt="Coffee Image" />
    </div>
  </q-card>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

const goToLogin = () => {
  router.push('/about')
}
</script>
<style scoped>
.profile-login {
  position: absolute;
  left: 31px;
  top: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px; /* 이미지와 텍스트 사이 여백 조절 */
  padding: 8px 20px; /* 내부 여백 설정 */
  background: #ffffff;
  border: 1px solid #bb8451;
  border-radius: 20px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 18px;
  color: #d8681d;
}

.profile-login img {
  height: 20px; /* 이미지 높이 조절 */
}

.profile-text-comp {
  position: absolute;
  width: 215px;
  height: 108px;
  left: 31px;
  top: 25px;
}

.profile-text {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-size: 30px;
  line-height: 36px;
  color: #000000;
}

.profile-text span {
  color: #bb8451;
}

.my-card {
  position: relative;
  height: 200px; /* 높이 조절 */
  overflow: hidden;
  background-color: #f5f5f5;
  backdrop-filter: blur(2px);
  border-radius: 10px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.image-container {
  position: absolute;
  top: 40px;
  left: 200px;
}

.image-container img {
  width: 200px;
  height: 200px;
}
</style>
