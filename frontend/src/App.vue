<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container class="app-body">
      <RouterView />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { RouterView } from 'vue-router'
import Header from './views/Header.vue'
</script>

<style scoped>
/* 헤더 슬롯의 배경색 설정 */
.q-layout-header {
  background-color: #ffffff; /* 적절한 색상 값으로 수정 */
}

/* 페이지 컨테이너의 배경색 설정 */
.app-body {
  background-color: rgb(239, 233, 217);
  background-size: cover;
  background-position: center;
}
</style>
