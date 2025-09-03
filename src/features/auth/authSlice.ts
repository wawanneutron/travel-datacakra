import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import type { AuthGetterState, AuthState, User } from '../../types/auth'

const initialState: AuthState = {
  user: null,
  token: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload.user
      state.token = action.payload.token
    },

    logout: (state) => {
      state.user = null
      state.token = null

      localStorage.removeItem('token')
      localStorage.removeItem('user')
    },

    loadFromStorage: (state) => {
      const token = localStorage.getItem('token')
      const user = localStorage.getItem('user')

      if (token && user) {
        state.token = token
        state.user = JSON.parse(user)
      }
    }
  }
})

export const { setAuth, logout, loadFromStorage } = authSlice.actions
export default authSlice.reducer

export const getToken = (state: AuthGetterState) => state.auth.token

export const getUser = (state: AuthGetterState) => state.auth.user
