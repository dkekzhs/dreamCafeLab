<script setup>
import { onMounted, ref, defineProps, defineEmits } from 'vue'

const props = defineProps(['content'])
</script>

<template>
  <div class="balloon_03">{{ props.content }}</div>
</template>

<style scoped>
.balloon_03 {
  position: relative;
  margin-left: 30px;
  margin-bottom: 10px;
  margin-right: 10px;
  margin-top: 10px;
  padding: 10px;
  font-size: larger;
  color: black;
  width: fit-content;
  /* height: 100px; */
  background: #ffffff;
  border-radius: 10px;
}
.balloon_03:after {
  border-top: 10px solid #ffffff;
  border-left: 15px solid transparent;
  border-right: 0px solid transparent;
  border-bottom: 0px solid transparent;
  content: '';
  position: absolute;
  top: 10px;
  left: -13px;
}
</style>
