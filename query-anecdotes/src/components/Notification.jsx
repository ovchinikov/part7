import React, { useContext } from 'react'
import { NotificationProvider, context } from './NotificationContext'
const Notification = () => {
  const [state, dispatch] = useContext(context)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  }

  setTimeout(() => {
    state.message && dispatch({ type: 'clear' })
  }, 5000)

  if (!state.message) {
    return
  }

  return <div style={style}>{state.message}</div>
}

export default Notification
