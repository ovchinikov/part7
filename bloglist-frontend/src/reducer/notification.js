import { createSlice } from '@reduxjs/toolkit'

const notifcationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setNotification: (state, action) => {
      return (state = action.payload)
    },
    clearNotification: (state, action) => {
      return ''
    },
  },
})

export const { setNotification, clearNotification } = notifcationSlice.actions

export const initializeNotification = (message, time) => {
  return async (dispatch) => {
    dispatch(setNotification(message))
    setTimeout(() => {
      dispatch(clearNotification())
    }, time * 1000)
  }
}

export default notifcationSlice.reducer
