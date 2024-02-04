import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'

const User = () => {
  const { id } = useParams()

  const user = useSelector((state) =>
    state.users.find((user) => user.id === id),
  )

  if (!user) {
    return null
  }

  return (
    <div className='p-4'>
      <h2 className='text-2xl font-bold mb-4'>{user.name}</h2>
      <h3 className='text-xl mb-2'>added blogs</h3>
      <ul className='list-disc pl-5'>
        {user.blogs.map((blog) => (
          <Link
            key={blog.id}
            to={`/blogs/${blog.id}`}
            className='text-blue-500 hover:text-blue-700 underline'
          >
            <li>{blog.title}</li>
          </Link>
        ))}
      </ul>
    </div>
  )
}

export default User
