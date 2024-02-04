import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { addComment, deleteBlogs, updateBlogs } from '../reducer/blogsReducer'
import { initializeNotification } from '../reducer/notification'
import { FaHeart } from 'react-icons/fa'
const BlogComponent = () => {
  const { id } = useParams()
  const blog = useSelector((state) =>
    state.blogs.find((blog) => blog.id === id),
  )

  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const handleLike = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    }
    console.log(updatedBlog)
    dispatch(updateBlogs(blog.id, updatedBlog))

    dispatch(initializeNotification(`Like added to ${blog.title}`, 5))
  }

  const handleDelete = () => {
    dispatch(deleteBlogs(blog.id))
    dispatch(initializeNotification(`${blog.title} deleted`, 5))
  }

  const handleComment = (event) => {
    event.preventDefault()
    const comment = event.target.comment.value
    event.target.comment.value = ''
    dispatch(addComment(blog.id, comment))
    dispatch(
      initializeNotification(`${user.name} commented to ${blog.title}`, 5),
    )
  }

  if (!blog) {
    return null
  }

  return (
    <div className='p-4 bg-white rounded shadow'>
      <h2 className='text-2xl font-bold mb-4'>
        {blog.title} {blog.author}
      </h2>
      <a
        href={blog.url}
        className='text-blue-500 hover:text-blue-700 underline'
      >
        {blog.url}
      </a>
      <div className='my-2'>
        {blog.likes} likes
        <button
          onClick={handleLike}
          className='rounded-md bg-indigo-600 px-3 py-1.5 mt-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
        >
          <FaHeart className='animate-pulse' />
        </button>
      </div>
      <div>added by {blog.user.name}</div>
      {blog.user.username === user.username && (
        <button
          onClick={handleDelete}
          className='rounded-md bg-indigo-600 px-3 py-1.5 mt-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
        >
          delete
        </button>
      )}
      <div>
        <form onSubmit={handleComment} className='mt-4'>
          <input
            type='text'
            name='comment'
            id='comment'
            className='rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
          />
          <button
            type='submit'
            className='rounded-md border-solid border-2 ml-2 border-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-indigo-600 shadow-sm hover:text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
          >
            add comment
          </button>
        </form>
        <h3 className='text-xl mt-4'>Comments</h3>
        <ul className='list-disc pl-5'>
          {blog.comments.length !== 0 ? (
            blog.comments.map((comment, index) => (
              <li key={index}>{comment}</li>
            ))
          ) : (
            <div>
              <p>No comments yet</p>
            </div>
          )}
        </ul>
      </div>
    </div>
  )
}

export default BlogComponent
