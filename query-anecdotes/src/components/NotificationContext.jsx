import { createContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'success':
      return { ...state, message: action.message, type: 'success' }
    case 'error':
      return { ...state, message: action.message, type: 'error' }
    case 'clear':
      return { ...state, message: null, type: null }
    default:
      throw new Error(`Unsupported action type: ${action.type}`)
  }
}

export const context = createContext()

export const NotificationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notificationReducer, {
    message: null,
    type: null,
  })

  return (
    <context.Provider value={[state, dispatch]}>{children}</context.Provider>
  )
}

export default NotificationProvider
