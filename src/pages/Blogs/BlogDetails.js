import React, { useContext } from 'react'
import { Link, useLoaderData, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthProvider'
import BlogEditModal from '../Profile/components/BlogEditModal'
import { BsArrowLeftCircleFill } from 'react-icons/bs'
import { toast } from 'react-hot-toast'
import DeleteBlogModal from '../Profile/components/DeleteBlogModal'

const BlogDetails = () => {
    const data = useLoaderData()
    const navigate = useNavigate()
    const { user } = useContext(AuthContext)
    const { title, body, img, date, tags, _id } = data
    const handleDelete = () => {
        fetch(`https://portfolio-backend-sepia-seven.vercel.app/blogs/${_id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(() => {
                toast.success("Blog deleted successfully")
                navigate('/blogs')
            })
    }
    return (
        <div className='lg:w-2/3 mx-auto'>
            <Link to='/blogs' className='text-info text-4xl -ml-20 fixed'><BsArrowLeftCircleFill /></Link>
            <img src={img} alt="" className='h-[350px] w-full object-cover rounded mt-6' />
            <h2 className='text-3xl font-bold mb-2 mt-6'>{title}</h2>
            <div className='mt-1 flex gap-2 text-xs text-success mb-2'>
                {
                    tags?.map((tag, i) => <span id={i}>{tag}&nbsp;&nbsp;{(i + 1) < tags.length && '|'}</span>)
                }
            </div>
            <p className='text-sm mb-5'>Posted on: {date}</p>
            <p className='text-justify text-[16px]' dangerouslySetInnerHTML={{ __html: body }} />


            {user &&
                <div className='mt-12 flex gap-6'>
                    <label htmlFor='blog-edit-modal' className="btn btn-info text-white">Edit Blog</label>
                    <label htmlFor='delete-blog-modal' className='btn btn-error text-white'>Delete this Blog</label>
                </div>
            }

            <BlogEditModal blog={data} />
            <DeleteBlogModal
                handleDeleteBlog={handleDelete}
                type = {'blog'}
                title={title} />
        </div>
    )
}

export default BlogDetails