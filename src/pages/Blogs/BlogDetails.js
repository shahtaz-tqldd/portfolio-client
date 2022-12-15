import React from 'react'
import { Link } from 'react-router-dom'

const BlogDetails = () => {
    const blog = {
        "id": 1,
        "title": "My Noob Web Dev Journey",
        "img": "https://img.freepik.com/free-vector/hand-drawn-web-developers_23-2148819604.jpg?w=2000",
        "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "date": "Nov 22, 2022",
        "tags": [
            "web development",
            "JavaScript",
            "React"
        ]
    }
    const { title, body, img, date, tags } = blog
    return (
        <div className='lg:w-2/3 mt-24'>
            <Link to='/blogs' className='btn bg-neutral'>Go Back</Link>
            <img src={img} alt="" className='h-[350px] w-full object-cover rounded mt-6'/>
            <h2 className='text-3xl font-bold mb-2 mt-6 text-white'>{title}</h2>
            <div className='mt-1 flex gap-2 text-xs text-success mb-2'>
                {
                    tags.map((tag, i) => <span id={i}>{tag}&nbsp;&nbsp;{(i + 1) < tags.length && '|'}</span>)
                }
            </div>
            <p className='text-sm mb-5'>Posted on: { date}</p>
            <p>{body}</p>
        </div>
    )
}

export default BlogDetails