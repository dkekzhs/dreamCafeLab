<script setup>
import {  RouterView } from 'vue-router'
import Footer from './views/Footer.vue'
import Header from './views/Header.vue'
</script>

<template>
  <q-layout view="hHh lpR fFf" style="background-color: yellow">
    <Header></Header>
    <q-page-container class="app-body"> <RouterView /> </q-page-container>

    <Footer></Footer>
  </q-layout>
</template>

<style scoped>
.app-body {
  background-color: white;
  /* padding: 0 !important; */
  /* margin: 0 !important; */
}

</style>
