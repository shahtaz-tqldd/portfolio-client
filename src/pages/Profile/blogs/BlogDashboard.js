import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import useTitle from '../../../hooks/useTitle'
import WriteBlogModal from '../../../components/Modals/WriteBlogModal'
import DeleteBlogModal from '../../../components/Modals/DeleteBlogModal'
import { toast } from 'react-hot-toast'

const BlogDashboard = () => {
    useTitle('Blog Dashboard')
    const [_id, setId] = useState()
    const { data: blogs = [], refetch } = useQuery({
        queryKey: ['blogs'],
        queryFn: async () => {
            const res = await fetch('https://portfolio-backend-sepia-seven.vercel.app/blogs')
            const data = await res.json()
            return data
        }
    })
    const handleDelete = () => {
        fetch(`https://portfolio-backend-sepia-seven.vercel.app/blogs/${_id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(() => {
                toast.success("Blog deleted successfully")
                refetch()
            })
    }
    return (
        <div className='w-full'>
            <div className='flex items-center justify-between'>
                <h1 className='text-4xl font-bold uppercase'>Blogs</h1>
                <label htmlFor='blog-modal' className='btn normal-case btn-primary'>Write Blog + </label>
            </div>

            {/* blog table */}
            <div className="overflow-x-auto mt-8">
                <table className="table w-full z-0">
                    <thead>
                        <tr className='text-success'>
                            <th></th>
                            <th>Title</th>
                            <th>Posted Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            blogs.map((blog, i) => <tr key={i}>
                                <th>{i + 1}</th>
                                <td><a href={`/blogs/${blog.title}`} target='__blank' className="hover:text-primary transition duration-300">{blog.title}</a></td>
                                <td>{blog.date}</td>
                                <td><label onClick={()=>setId(blog?._id)} htmlFor='delete-blog-modal' className='btn btn-error text-white btn-sm normal-case'>Delete</label></td>
                            </tr>
                            )
                        }

                    </tbody>
                </table>
            </div>
            <WriteBlogModal />
            <DeleteBlogModal
                handleDeleteBlog={handleDelete}
                type={'blog'}
                title=''
            />
        </div>
    )
}

export default BlogDashboard