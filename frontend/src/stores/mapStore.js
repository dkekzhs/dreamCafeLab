import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
export const useMapStore = defineStore('mapStore', () => {
  const guCategories = ref([])
  const dongCategories = ref([])
  const sangCategories = ref([])

  async function setGuCategories() {
    const categories = []

    const response = await fetch(`${import.meta.env.VITE_GU_GEOJSON_PATH}`)
    let json = await response.json()
    json.features.forEach((feature) => {
      categories.push({
        code: feature.properties.SIG_CD,
        name: feature.properties.SIG_KOR_NM
      })
    })
    categories.sort((a, b) => a.name.localeCompare(b.name))
    guCategories.value = categories
  }

  async function setDongCategories(guName) {
    console.log(guName)
    let categories = []
    if (dongCategories.value.length !== 0) return
    const response = await fetch(`${import.meta.env.VITE_DONG_GEOJSON_PATH}`)
    let json = await response.json()
    // 선택된 구에 해당하는 동만 표시
    json.features
      .filter((feature) => feature.properties.adm_nm.split(' ')[1] == guName)
      .forEach((feature) => {
        categories.push({
          code: feature.properties.adm_cd,
          name: feature.properties.adm_nm.split(' ')[2]
        })
      })
    categories.sort((a, b) => a.name.localeCompare(b.name))
    dongCategories.value = categories
  }
  async function setSangCategories(dongName) {
    let categories = []
    if (sangCategories.value.length !== 0) return
    const response = await fetch(`${import.meta.env.VITE_SANG_GEOJSON_PATH}`)
    let json = await response.json()

    // 선택된 동에 해당하는 상권만 표시
    json.features
      .filter((feature) => feature.properties.ADSTRD_CD_ === dongName)
      .forEach((feature) => {
        categories.push({
          code: feature.properties.TRDAR_CD,
          name: feature.properties.TRDAR_CD_N
        })
      })
    categories.sort((a, b) => a.name.localeCompare(b.name))
    sangCategories.value = categories
  }
  async function clearData() {
    guCategories.value = []
    dongCategories.value = []
    sangCategories.value = []
  }
  return {
    setGuCategories,
    guCategories,
    setDongCategories,
    dongCategories,
    setSangCategories,
    sangCategories,
    clearData
  }
})
