import { Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PrivateRoute = ({ children, ...props }) => {
  const user = useSelector((state) => state.user)
  return <Route {...props}>{user ? children : <Navigate to='/login' />}</Route>
}

export default PrivateRoute
