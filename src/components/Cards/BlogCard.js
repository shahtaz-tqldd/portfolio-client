import React from 'react'
import { Link } from 'react-router-dom'

const BlogCard = ({ blog }) => {
    const { title, tags, body } = blog
    const shortBody = body.slice(0,300)
    return (
        <Link to={`/blogs/${title}`} className='border-[1px] border-accent p-6 rounded-2xl hover:border-primary hover:text-primary' data-aos="fade-up">
            <h2 className='text-4xl'>{title}</h2>
            <div className='mt-3 flex gap-5 text-sm text-accent'>
                {
                    tags?.map((tag, index) => <span key={index}>{tag}</span>)
                }
            </div>
            <p className='text-justify text-accent mt-5' dangerouslySetInnerHTML={{ __html: shortBody }} /> 
        </Link>
    )
}

export default BlogCard