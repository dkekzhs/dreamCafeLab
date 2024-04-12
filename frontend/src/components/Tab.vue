<template>
  <div class="q-pa-md">
    <div class="q-gutter-y-md" style="max-width: 400px">
      <q-tab-panels v-model="tab">
        <q-tab-panel name="mails">
          <div>
            <!-- Mails 내용을 여기에 추가 -->
            <p>MAIL MAIL MAIL MAIL MAIL MAIL MAIL MAIL MAIL</p>
          </div>
        </q-tab-panel>
        <q-tab-panel name="alarms">
          <div>
            <!-- Alarms 내용을 여기에 추가 -->
            <p>Alarms Alarms Alarms Alarms Alarms Alarms Alarms Alarms Alarms</p>
          </div>
        </q-tab-panel>
        <q-tab-panel name="movies">
          <div>
            <!-- Movies 내용을 여기에 추가 -->
            <p>MOVIES MOVIES MOVIES MOVIES MOVIES MOVIES MOVIES MOVIES MOVIES</p>
          </div>
        </q-tab-panel>
      </q-tab-panels>

      <q-tabs v-model="tab" narrow-indicator dense align="justify" class="text-primary">
        <q-tab :ripple="false" name="mails" icon="mail" label="Mails" />
        <q-tab :ripple="false" name="alarms" icon="alarm" label="Alarms" />
        <q-tab :ripple="false" name="movies" icon="movie" label="Movies" />
      </q-tabs>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    return {
      tab: ref('mails')
    }
  }
}
</script>
