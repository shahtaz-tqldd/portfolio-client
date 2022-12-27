import { useQuery } from '@tanstack/react-query'
import React from 'react'
import useTitle from '../../hooks/useTitle'
import BlogCard from './components/BlogCard'

const Blogs = () => {
  useTitle('Blogs')
  const { data: blogs =[]} = useQuery({
    queryKey: ['blogs'],
    queryFn: async () => {
      const res = await fetch('https://portfolio-backend-sepia-seven.vercel.app/blogs')
      const data = await res.json()
      return data
    }
  })
  return (
    <div>
      <h6 className='text-3xl text-warning mt-12'>Noob Dev. Blogs</h6>
      <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 mt-8'>
        {
          blogs.map(blog => <BlogCard key={blog._id} blog={blog} />)
        }
      </div>
    </div>
  )
}

export default Blogs