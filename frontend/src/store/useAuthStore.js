import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import api from '../lib/api.js'

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      loading: false,
      error: null,

      register: async ({ name, email, phone, password, password_confirmation }) => {
        set({ loading: true, error: null })
        try {
          const res = await api.post('/register', { name, email, phone, password, password_confirmation })
          const { user, token } = res.data
          api.defaults.headers.common.Authorization = `Bearer ${token}`
          set({ user, token, loading: false })
          return { success: true }
        } catch (err) {
          const message = err.response?.data?.message || 'Registration failed. Please check your details.'
          set({ loading: false, error: message })
          return { success: false, error: message, fieldErrors: err.response?.data?.errors }
        }
      },

      login: async ({ email, password }) => {
        set({ loading: true, error: null })
        try {
          const res = await api.post('/login', { email, password })
          const { user, token } = res.data
          api.defaults.headers.common.Authorization = `Bearer ${token}`
          set({ user, token, loading: false })
          return { success: true }
        } catch (err) {
          const message = err.response?.data?.message || 'Invalid email or password.'
          set({ loading: false, error: message })
          return { success: false, error: message }
        }
      },

      logout: async () => {
        try {
          await api.post('/logout')
        } catch {
          // token may already be invalid/expired — proceed with local logout regardless
        }
        delete api.defaults.headers.common.Authorization
        set({ user: null, token: null })
      },
    }),
    {
      name: 'sila-auth',
      // Reattach the Authorization header after a page refresh, since axios
      // defaults don't survive reload — only the persisted store state does.
      onRehydrateStorage: () => (state) => {
        if (state?.token) {
          api.defaults.headers.common.Authorization = `Bearer ${state.token}`
        }
      },
    }
  )
)

export const selectIsAuthenticated = (state) => Boolean(state.token)