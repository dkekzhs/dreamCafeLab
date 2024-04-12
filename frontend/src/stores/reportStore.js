import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from '@/utils/common-axios'

export const useReportStore = defineStore('useReportStore', () => {
  const reportCardData = ref([])
  const brandData = ref([])
  const getBrandData = async (lat, lng) => {
    const params = { lat: lat, lng: lng }
    const response = await axios
      .get(`/district/recommend/cafe/point`, { params })
      .then((response) => {
        console.log('brandData: ', response.data.result)
        brandData.value = response.data.result
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response)
        }
      })
  }

  const getReportCardData = async (sgCode) => {
    const response = await axios
      .get(`/district/report/${sgCode}`)
      .then((response) => {
        if (response) {
          console.log(response.data.result)
          reportCardData.value = response.data.result
        }
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response)
        }
      })
  }
  return {
    getBrandData,
    getReportCardData,
    brandData,
    reportCardData
  }
})
