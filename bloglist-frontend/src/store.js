import blogsReducer from './reducer/blogsReducer'
import notificationReducer from './reducer/notification'
import userReducer from './reducer/userReducer'
import usersReducer from './reducer/usersReducer'
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
  reducer: {
    blogs: blogsReducer,
    notification: notificationReducer,
    user: userReducer,
    users: usersReducer,
  },
})

export default store
