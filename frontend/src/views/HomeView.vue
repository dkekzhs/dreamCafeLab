<template>
  <q-page class="q-pa-md">
    <ProfileCard />
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
