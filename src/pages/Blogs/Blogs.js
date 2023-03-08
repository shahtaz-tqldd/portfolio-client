import { useQuery } from '@tanstack/react-query'
import React from 'react'
import useTitle from '../../hooks/useTitle'
import BlogCard from '../../components/Cards/BlogCard'

const Blogs = () => {
  useTitle('Blogs')
  const { data: blogs = [] } = useQuery({
    queryKey: ['blogs'],
    queryFn: async () => {
      const res = await fetch('https://portfolio-backend-sepia-seven.vercel.app/blogs')
      const data = await res.json()
      return data
    }
  })
  return (
    <section className='max-w-[1230px] mx-auto px-3'>
      <h6 className='text-3xl text-neutral flex items-center mt-8 gap-2'>
        <lord-icon
          target="div"
          src="https://cdn.lordicon.com/vufjamqa.json"
          trigger="hover"
          colors="primary:#232334"
          style={{ height: '30px', width: "30px" }}>
        </lord-icon>
        Noob Dev. Blogs
      </h6>
      <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 mt-8'>
        {
          blogs.map((blog, index) => <BlogCard key={index} index={index} blog={blog} />)
        }
      </div>
    </section>
  )
}

export default Blogs