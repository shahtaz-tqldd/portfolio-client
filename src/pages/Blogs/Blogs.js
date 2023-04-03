import { useQuery } from '@tanstack/react-query'
import React from 'react'
import useTitle from '../../hooks/useTitle'
import BlogCard from '../../components/Cards/BlogCard'
import SectionTitle from '../../components/Typography/SectionTitle'
import SectionHead from '../../components/Typography/SectionHead'

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
  const props= {img: "https://cdn.lordicon.com/vufjamqa.json", text:"Blogs"}
  return (
    <section className='mb-20'>
      <SectionTitle props={props} />
      <SectionHead>Dev <span className='text-primary'>Blogs</span></SectionHead>

      <div className='grid grid-cols-1 gap-6'>
        {
          blogs.map((blog, index) => <BlogCard key={index} index={index} blog={blog} />)
        }
      </div>
    </section>
  )
}

export default Blogs