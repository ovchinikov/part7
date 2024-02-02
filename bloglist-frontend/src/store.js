import blogsReducer from './reducer/blogsReducer'
import notificationReducer from './reducer/notification'
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
  reducer: {
    blogs: blogsReducer,
    notification: notificationReducer,
  },
})

export default store
