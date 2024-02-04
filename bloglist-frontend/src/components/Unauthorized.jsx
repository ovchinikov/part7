import { Link, Navigate } from 'react-router-dom'

const Unauthorized = () => {
  return (
    <div className='flex min-h-full flex-col justify-center px-6 py-12 lg:px-8'>
      <h2 className='text-2xl font-bold leading-9 tracking-tight text-gray-900 sm:text-3xl sm:leading-10'>
        Unauthorized
      </h2>
      <p className>You are not authorized to view this page. Please</p>
    </div>
  )
}

export default Unauthorized
