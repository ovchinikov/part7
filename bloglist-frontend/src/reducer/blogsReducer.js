import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    addBlog: (state, action) => {
      return state.concat(action.payload)
    },
    removeBlog: (state, action) => {
      return state.filter((blog) => blog.id !== action.payload)
    },
    appendBlog: (state, action) => {
      return state.map((blog) =>
        blog.id !== action.payload.id ? blog : action.payload,
      )
    },

    setBlogs: (state, action) => {
      return action.payload
    },
  },
})

export const { addBlog, removeBlog, appendBlog, setBlogs } = blogSlice.actions

// create blog

export const createBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blog)
    dispatch(addBlog(newBlog))
  }
}

// update blog

export const updateBlogs = (id, blog) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.update(id, blog)
    dispatch(appendBlog(updatedBlog))
  }
}

// remove blog

export const deleteBlogs = (id) => {
  return async (dispatch) => {
    await blogService.remove(id)
    dispatch(removeBlog(id))
  }
}

// initialize blogs

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

// find a single blog
export const findBlog = (id) => {
  return async (dispatch) => {
    const blog = await blogService.getOne(id)
    dispatch(appendBlog(blog))
  }
}

// add comment
export const addComment = (id, comment) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.addComment(id, comment)
    dispatch(appendBlog(updatedBlog))
  }
}

// get comments
export const getComments = (id) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.getComments(id)
    dispatch(appendBlog(updatedBlog))
  }
}
export default blogSlice.reducer
