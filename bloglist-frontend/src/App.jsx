import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from './components/notification'
import LoginForm from './components/loginform'
import Togglable from './components/togglable'
import CreateBlog from './components/createblog'
import { useDispatch, useSelector } from 'react-redux'
import {
  appendBlog,
  createBlog,
  initializeBlogs,
  setBlogs,
  deleteBlogs,
} from './reducer/blogsReducer'
import { initializeNotification } from './reducer/notification'

const App = () => {
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState({ type: '', text: '' })
  const dispatch = useDispatch()

  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const blogs = useSelector((state) => state.blogs)

  console.log(blogs)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('user')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const notifyUser = (text, type) => {
    setMessage({ text, type })
  }

  const handleLogOut = () => {
    const ok = window.confirm('Are you want to logout?')
    if (ok) {
      window.localStorage.clear()
    } else return
  }
  // create blog

  const addBlog = ({ title, author, url }) => {
    try {
      dispatch(createBlog({ title, author, url }))
      dispatch(initializeNotification(`${title} added by ${user.name}`, 5))
      blogFormRef.current.toggleVisibility()
    } catch (error) {
      dispatch(initializeNotification(error.message, 5))
    }
  }

  // increase likes

  const increaseLikes = async (blog) => {
    try {
      const newBlog = await blogService.update(blog.id, {
        ...blog,
        likes: blog.likes + 1,
      })
      setBlogs(blogs.map((blog) => (blog.id !== newBlog.id ? blog : newBlog)))
    } catch (error) {
      dispatch(initializeBlogs(error.message, 'error'))
    }
  }

  const deleteBlog = (blog) => {
    try {
      const ok = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
      if (ok) {
        dispatch(deleteBlogs(blog.id))
        dispatch(initializeNotification(`${blog.title} removed`, 5))
      } else return
    } catch (error) {
      dispatch(initializeNotification(error.message, 5))
    }
  }

  return (
    <div>
      <Notification message={message} />
      {!user && (
        <Togglable buttonLabel='login'>
          <LoginForm setUser={setUser} notifyUser={notifyUser} />
        </Togglable>
      )}
      {user && (
        <div>
          <p>Bienvenido {user.username}!</p>
          <button onClick={handleLogOut}>Logout</button>
          <Togglable buttonLabel='create' ref={blogFormRef}>
            <CreateBlog
              setBlogs={appendBlog}
              blogs={blogs}
              notifyUser={notifyUser}
              user={user}
              blogFormRef={blogFormRef}
              createBlog={addBlog}
            />
          </Togglable>
          <h2>blogs</h2>
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              user={user}
              deleteBlog={() => deleteBlog(blog)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default App
