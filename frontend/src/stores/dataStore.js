import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
// import { a } from 'vitest/dist/suite-UrZdHRff'
export const useDataStore = defineStore(
  'dataStore',
  () => {
    const location = ref(null)
    const investment = ref(null)
    const loan = ref(null)
    const rate = ref(null)
    const size = ref(null)
    const employees = ref(null)
    const address = ref(null)

    async function setAddress(address) {
      this.address = address
    }
    const brandId = ref(null)
    const brandData = ref(null)
    async  function setBrandData(data) {
      brandData.value = data
    }
    
    async function setAsset(iv, ln, rt) {
      investment.value = iv
      loan.value = ln
      rate.value = rt
    }

    async function setSize(data) {
      size.value = data
    }

    async function setEmployees(data) {
      employees.value = data
    }

    async function setLocation(data) {
      location.value = data
    }

    async function setSelectedBrandId(data) {
      brandId.value = data
    }

    async function clearData() {
      location.value = null
      investment.value = null
      loan.value = null
      rate.value = null
    }

    return {
      location,
      investment,
      loan,
      rate,
      size,
      employees,
      address,
      brandId,
      brandData,
      setBrandData,
      setAsset,
      setLocation,
      setSize,
      setEmployees,
      clearData,
      setAddress,
      setSelectedBrandId,
      clearData
    }
  },
  { persist: true }
)
