import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { Link } from 'react-router-dom'
import WriteBlogModal from '../components/WriteBlogModal'

const BlogDashboard = () => {
    const { data: blogs = [] } = useQuery({
        queryKey: ['blogs'],
        queryFn: async () => {
            const res = await fetch('https://portfolio-backend-sepia-seven.vercel.app/blogs')
            const data = await res.json()
            return data
        }
    })
    return (
        <div className='w-full'>
            <div className='flex items-center justify-between'>
                <h1 className='text-4xl font-bold uppercase'>Blogs</h1>
                <label htmlFor='blog-modal' className='btn btn-sm normal-case rounded-sm text-white btn-primary'>Write + </label>
            </div>

            {/* blog table */}
            <div className="overflow-x-auto mt-8">
                <table className="table w-full z-0">
                    <thead>
                        <tr className='text-success'>
                            <th></th>
                            <th>Title</th>
                            <th>Posted Date</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            blogs.map((blog, i) => <tr key={i}>
                                <th>{i + 1}</th>
                                <td>{blog.title}</td>
                                <td>{blog.date}</td>
                                <td><Link to={`/blogs/${blog.title}`} className="text-primary hover:text-warning transition duration-300">See Details</Link></td>
                            </tr>
                            )
                        }

                    </tbody>
                </table>
            </div>

            <WriteBlogModal />
        </div>
    )
}

export default BlogDashboard