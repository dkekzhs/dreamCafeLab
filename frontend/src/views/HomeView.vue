<template>
  <q-page class="q-pa-md">
    <ProfileCard />
    <h1>F12로 모바일 화면 중 겔럭시s20울트라로 바꿔서 하세용</h1>
  </q-page>
</template>

<script>
import ProfileCard from '@/components/home-card/ProfileCard.vue'
import RankingCard from '@/components/home-card/RankingCard.vue'

export default {
  components: {
    ProfileCard,
    RankingCard
  }
}
</script>

<style scoped>
.q-pa-md {
  height: 85svh;
}
</style>
