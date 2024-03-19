<script setup>
import { onMounted, ref, defineProps } from 'vue'
const toPoly = function () {
  // emits('update:isSummary', false)
  this.$router.push({ name: 'simulation_poly_file' })
}
</script>

<template>
  <div class="loanContainer">
    <a href="/simulation_poly_file" style="width: 30px">X</a>
    <h3>Loan</h3>
  </div>
</template>

<style scoped>
.loanContainer {
  background-image: url('@/../public/apaper.jpg');
  /* width: 100%;
  height: 100%; */
  width: 350px;
  height: 500px;
}
</style>
