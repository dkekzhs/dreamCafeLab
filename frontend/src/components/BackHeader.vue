<template>
  <div><img class="back" src="@/../public/back.png" @click="back" /></div>
</template>

<script setup>
const back = function () {
  window.history.back()
}
</script>

<style>
.back {
  top: 10px;
  left: 10px;
  width: 25px;
  height: 25px;
  margin: 10px;
}
</style>
