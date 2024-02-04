import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './components/Blog'
import Notification from './components/notification'
import LoginForm from './components/loginform'
import Togglable from './components/togglable'
import CreateBlog from './components/createblog'
import { Route, Routes, Navigate } from 'react-router-dom'
import { initializeBlogs } from './reducer/blogsReducer'
import { initializeUser, setUser } from './reducer/userReducer'
import Menu from './components/Menu'
import Users from './components/Users'
import BlogComponent from './components/blogComponent'
import User from './components/User'

const App = () => {
  const dispatch = useDispatch()

  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeUser())
  }, [])

  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)
  const message = useSelector((state) => state.notification)

  return (
    <div className='flex flex-col justify-between min-h-screen'>
      <Menu />
      <Routes>
        <Route
          path='/login'
          element={
            user ? <Navigate to='/blogs' /> : <LoginForm setUser={setUser} />
          }
        />
        <Route
          path='/blogs'
          element={
            user ? (
              <div className='flex justify-center flex-col items-center'>
                <div className='mt-2'>
                  <Togglable buttonLabel='create' ref={blogFormRef}>
                    <CreateBlog />
                  </Togglable>
                </div>

                <div className='flex flex-col'>
                  <h2 className='text-3xl text-indigo-600 mt-4 mb-2'>
                    All blogs
                  </h2>
                  {blogs.map((blog) => (
                    <Blog key={blog.id} blog={blog} />
                  ))}
                </div>
              </div>
            ) : (
              <Navigate replace to='/login' />
            )
          }
        />
        <Route
          path='/users'
          element={user ? <Users /> : <Navigate replace to='/login' />}
        />
        <Route path='/blogs/:id' element={<BlogComponent />} />
        <Route
          path='/users/:id'
          element={user ? <User /> : <div>Please login to view users</div>}
        />
      </Routes>

      <div className='flex justify-center  p-4 items-center w-full'>
        <div className='mt-4'>
          <p className='text-sm text-gray-500'>
            &copy; {new Date().getFullYear()}{' '}
            <a
              href='http://github.com/ovchinikov'
              target='_blank'
              rel='noopener noreferrer'
            >
              Ovchinikov
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default App
