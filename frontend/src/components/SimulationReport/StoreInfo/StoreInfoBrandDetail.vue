<script setup>
import { onMounted, ref, defineProps } from 'vue'
import 'animate.css/animate.min.css'

const props = defineProps(['name', 'content'])
const name = props.name
const content = props.content

onMounted(() => {
  console.log('mounted')
})
</script>

<template>
  <div class="DetailContainer">
    <div class="content">
      <div style="font-weight: bold">{{ name }}</div>
      <div>{{ content }}</div>
    </div>
  </div>
</template>

<style scoped>
.DetailContainer {
  /* display: flex;
  flex-direction: column;
  justify-self: center;
  padding: 10px; */
  width: 100%;
}

hr {
  width: 90%;
  border: dotted 10px #000;
}

.content {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 5px;
  margin: 10px;
}
</style>
