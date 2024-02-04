import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import loginService from '../services/login'
const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser: (state, action) => {
      return action.payload
    },
  },
})

// login

export const login = (user) => {
  return async (dispatch) => {
    return loginService.login(user).then((user) => {
      window.localStorage.setItem('user', JSON.stringify(user))
      dispatch(setUser(user))
      blogService.setToken(user.token)
    })
  }
}

export const logout = () => {
  return async (dispatch) => {
    window.localStorage.removeItem('user')
    dispatch(setUser(null))
  }
}
export const initializeUser = () => {
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('user')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }
}

export const { setUser } = userSlice.actions

export default userSlice.reducer
