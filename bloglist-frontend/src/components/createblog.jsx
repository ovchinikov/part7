import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducer/blogsReducer'

const CreateBlog = () => {
  const dispatch = useDispatch()
  const addBlog = (e) => {
    e.preventDefault()
    const title = e.target.title.value
    const author = e.target.author.value
    const url = e.target.url.value
    e.target.title.value = ''
    e.target.author.value = ''
    e.target.url.value = ''

    dispatch(createBlog({ title, author, url }))
  }
  return (
    <form onSubmit={addBlog}>
      <div>
        <label
          for='title'
          className='block text-sm font-medium leading-6 text-gray-900'
        >
          Title
        </label>
        <div className='mt-2'>
          <input
            id='title'
            name='title'
            type='text'
            required
            className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
          />
        </div>
      </div>
      <div>
        author
        <input
          type='text'
          id='author'
          name='author'
          required
          className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
        />
      </div>
      <div>
        <label
          for='url'
          className='block text-sm font-medium leading-6 text-gray-900'
        >
          Url
        </label>
        <div className='mt-2'>
          <input
            id='url'
            name='url'
            type='text'
            required
            className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
          />
        </div>
      </div>

      <button className='w-full rounded-md bg-indigo-600 px-3 py-1.5 mt-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
        submit
      </button>
    </form>
  )
}

export default CreateBlog
