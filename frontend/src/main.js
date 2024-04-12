import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Quasar } from 'quasar'
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/dist/quasar.css'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import Vue3TouchEvents from 'vue3-touch-events'

import App from './App.vue'
import router from './router'

const app = createApp(App)

const pinia = createPinia() // Use createPinia() here
pinia.use(piniaPluginPersistedstate)

app.use(Vue3TouchEvents)
app.use(pinia)
app.use(router)
app.use(Quasar, {
  plugins: {}
})

app.mount('#app')
