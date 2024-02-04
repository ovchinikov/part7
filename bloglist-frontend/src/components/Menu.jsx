import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../reducer/userReducer'
import { FaSignOutAlt } from 'react-icons/fa'

const Menu = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const handleLogOut = () => {
    const ok = window.confirm('Are you want to logout?')
    if (ok) {
      dispatch(logout())
      navigate('/login')
    } else return
  }

  return (
    <div className='flex justify-between items-center bg-indigo-600 p-4'>
      <div>
        <Link className='text-white hover:text-gray-200 mr-4' to='/blogs'>
          blogs
        </Link>
        <Link className='text-white hover:text-gray-200' to='/users'>
          users
        </Link>
      </div>
      {user && (
        <div className='flex items-center'>
          <span className='text-white mr-4'>{user.name} logged in</span>
          <button
            onClick={handleLogOut}
            className='text-white hover:text-gray-200'
          >
            <FaSignOutAlt />
          </button>
        </div>
      )}
    </div>
  )
}

export default Menu
