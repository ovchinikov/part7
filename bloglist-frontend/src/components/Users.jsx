import { useSelector, useDispatch } from 'react-redux'
import { initializeUsers } from '../reducer/usersReducer'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

const Users = () => {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.users)

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  return (
    <div className='p-4'>
      <h2 className='text-2xl font-bold mb-4'>Users</h2>
      <table className='table-auto w-full'>
        <thead>
          <tr className='bg-gray-200'>
            <th className='px-4 py-2'>Users</th>
            <th className='px-4 py-2'>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className='text-center border-b border-gray-200'>
              <td className='px-4 py-2'>
                <Link
                  to={`/users/${user.id}`}
                  className='text-blue-500 hover:text-blue-700'
                >
                  {user.name}
                </Link>
              </td>
              <td className='px-4 py-2'>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
export default Users
