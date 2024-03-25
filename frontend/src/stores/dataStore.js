import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
export const useDataStore = defineStore(
  'dataStore',
  () => {
    const location = ref(null)

    async function setLocation(data) {
      location.value = data
    }
    async function clearData() {
      location.value = null
    }

    return {
      location,
      setLocation,
      clearData
    }
  },
  { persist: true }
)
