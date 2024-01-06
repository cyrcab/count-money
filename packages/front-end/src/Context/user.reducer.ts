import { createSlice } from '@reduxjs/toolkit'
import { User } from '../Entities/User'

interface AuthState {
  user: User | null
  isLoggedIn: boolean
}

const initialState: AuthState = {
  user: null,
  isLoggedIn: false,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload as User
      state.isLoggedIn = true
    },
    logout: (state) => {
      state.user = null
      state.isLoggedIn = false
    },
  },
})

export const { login, logout } = authSlice.actions

export default authSlice.reducer
