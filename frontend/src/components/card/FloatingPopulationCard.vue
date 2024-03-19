<!-- Card.vue -->
<template>
  <div class="text-h6">{{ title }}</div>
  나는야 유동인구
  <div class="text-subtitle2">{{ author }}</div>
</template>

<script>
export default {
  props: {
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
  }
}
</script>

<style scoped>
.my-card {
  width: 100%;
}
</style>
