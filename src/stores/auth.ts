import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export type UserRole = 'GUEST' | 'USER' | 'ADMIN'

export interface User {
  id: number
  name: string
  email: string
  role: UserRole
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)

  const isAuthenticated = computed(() => user.value !== null)
  const isAdmin = computed(() => user.value?.role === 'ADMIN')

  function loginAsUser() {
    user.value = { id: 1, name: 'Gabriel Silva', email: 'gabriel@email.com', role: 'USER' }
  }

  function loginAsAdmin() {
    user.value = { id: 2, name: 'Admin Root', email: 'admin@store.com', role: 'ADMIN' }
  }

  function logout() {
    user.value = null
  }

  return { user, isAuthenticated, isAdmin, loginAsUser, loginAsAdmin, logout }
})
