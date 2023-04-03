import React from 'react'
import { Link } from 'react-router-dom'

const Errorpage = () => {
  return (
    <div className='flex w-full flex-col min-h-[100vh] items-center justify-center'>
      <h1 className='lg:text-4xl md:text-3xl text-2xl'>404 Error! Page not found</h1>
      <div className='lg:mt-10 md:mt-8 mt-6 lg:text-xl text-lg'>Go Back to <Link to='/' className='text-primary'>Homepage</Link></div>
    </div>
  )
}

export default Errorpage