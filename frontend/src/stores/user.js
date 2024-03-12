import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const isLogin = ref(true)

  function login() {
    isLogin.value = true
  }

  function logout() {
    isLogin.value = false
  }

  return { login, isLogin, logout }
})
