<script setup>
import { onMounted, ref, defineProps, defineEmits } from 'vue'

const props = defineProps(['title', 'tag', 'img'])
const tags = props.tag
</script>

<template>
  <div class="cardContainer">
    <img :src="`${props.img}`" alt="" />
    <div class="text">
      <p>{{ props.title }}</p>
      <div class="tags">
        <div class="tag" v-for="tag in tags">#{{ tag }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cardContainer {
  /* 내용에 맞게 유연하게 바뀌었으면 좋겠다 */
  display: flex;
  flex-direction: column; /* 내부 아이템을 세로로 배열합니다. */
  justify-self: center;
  /* flex-wrap: wrap; */

  width: 44%;
  height: 350px;
  left: -5px;
  margin: 10px;
  top: 160px;

  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
  background: #ffffff;
  border-radius: 20px;
}

.tags {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  /* justify-content: start; */
  margin-left: 10px;
  color: #888888;
}

.text {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.text p {
  font-weight: bold;
  font-size: 2.5svh;
}

.tag {
  margin: 5px;
}

img {
  width: 50%;
  height: 30%;
  margin: 5svh;
}

h6 {
  display: flex;
  justify-content: center;
}
</style>
