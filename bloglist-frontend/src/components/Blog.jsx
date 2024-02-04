import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const Blog = ({ blog }) => {
  return (
    <div className='p-4 mt-2'>
      <div className='blog'>
        <Link
          to={`/blogs/${blog.id}`}
          className='text-2xl text-indigo-500 hover:text-indigo-600'
        >
          {blog.title} -{' '}
          <span className='text-xl text-gray-500'>{blog.author}</span>
        </Link>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default Blog
