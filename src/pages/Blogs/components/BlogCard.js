import React from 'react'
import { Link } from 'react-router-dom'
import "./blogcard.css"

const BlogCard = ({ blog }) => {
    const { title, img, tags } = blog
    return (
        <Link data-aos="fade-up"  className='overflow-hidden rounded-lg' to={`/blogs/${title}`}>
            <div className='h-56 rounded-lg hover:scale-105 transition duration-300 shadow-xl' style={{ backgroundImage: `url(${img})`, backgroundSize: "cover" }}>
                <div className='gradient h-full rounded-b-lg relative'>
                    <div className='absolute bottom-0 p-5'>
                        <h2 className='text-xl font-bold text-white'>{title}</h2>
                        <div className='mt-1 flex gap-2 text-xs text-success'>
                            {
                                tags.map((tag, i) => <span id={i}>{tag}&nbsp;&nbsp;{ (i+1)<tags.length && '|'}</span>)
                            }
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default BlogCard