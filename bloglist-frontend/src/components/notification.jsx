import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { initializeNotification } from '../reducer/notification'

const Notification = () => {
  const message = useSelector((state) => state.notification)
  console.log('message', message)

  const style = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  if (!message) {
    return
  } else {
    return (
      <div style={style} className='error'>
        {message}
      </div>
    )
  }
}

Notification.propTypes = {
  message: PropTypes.string.isRequired,
}
export default Notification
