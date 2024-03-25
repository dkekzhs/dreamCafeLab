<script setup>
import Avatar from '@/components/Avatar.vue'
import AjaxBar from '@/components/AjaxBar.vue'
import Renderer from '@/components/Render.vue'
import Tab from '@/components/Tab.vue'
</script>

<template>
  <Avatar/>
  <Avatar/>
  <Tab/>
  <AjaxBar/>
  <Renderer/>
</template>

<style scoped>
* {
  position: relative;
  float: left;
}
</style>
