import React, { useContext } from 'react'
import { Link, useLoaderData, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthProvider'
import BlogEditModal from '../../components/Modals/BlogEditModal'
import { toast } from 'react-hot-toast'
import DeleteBlogModal from '../../components/Modals/DeleteBlogModal'
import useTitle from '../../hooks/useTitle'

const BlogDetails = () => {
    const data = useLoaderData()
    const navigate = useNavigate()
    const { user } = useContext(AuthContext)
    const { title, body, img, date, tags, _id } = data
    useTitle(title)
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
        <section className='mt-16 mb-20 relative'>
            <Link to='/blogs' className='border-[1px] border-accent hover:border-primary rounded-full icon px-3 py-2 fixed right-10 top-32'>
                <lord-icon
                    src="https://cdn.lordicon.com/zmkotitn.json"
                    trigger="hover"
                    class="current-color"
                    style={{ width: "25px", height: "25px", paddingTop: "4px", transform: "scaleX(-1)" }}>
                </lord-icon>
            </Link>
            <div className='flex mb-3'>
                <div className="border-[1px] border-accent py-2 px-5 text-xs flex items-center gap-2 rounded-full">
                    <lord-icon
                        target="div"
                        src="https://cdn.lordicon.com/qznlhdss.json"
                        trigger="hover"
                        colors="primary:#fff"
                        style={{ width: "16px", height: "16px" }}>
                    </lord-icon>
                    {date}
                </div>
            </div>
            <img src={img} alt="" className='h-[380px] w-full object-cover rounded-3xl' />
            <h2 className='text-5xl font-bold text-primary mb-2 mt-6'>{title}</h2>
            <div className='mt-3 flex gap-5 text-sm text-accent'>
                {
                    tags?.map((tag, index) => <span key={index}>{tag}</span>)
                }
            </div>
            <p className='text-justify text-accent text-[17px] mt-6' dangerouslySetInnerHTML={{ __html: body }} />


            {user &&
                <div className='mt-12 flex justify-end gap-4'>
                    <label htmlFor='blog-edit-modal' className="btn btn-sm rounded-full normal-case btn-primary text-white">Edit Blog</label>
                    <label htmlFor='delete-blog-modal' className='btn btn-sm rounded-full btn-error normal-case text-white'>Delete Blog</label>
                </div>
            }

            <BlogEditModal blog={data} />
            <DeleteBlogModal
                handleDeleteBlog={handleDelete}
                type={'blog'}
                title={title} 
            />
        </section>
    )
}

export default BlogDetails