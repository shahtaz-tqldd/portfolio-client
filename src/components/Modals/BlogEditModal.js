import { format } from 'date-fns';
import React, { useRef, useState } from 'react'
import JoditEditor from 'jodit-react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const BlogEditModal = ({ blog }) => {
    const { title, body, tags, _id } = blog
    const navigate = useNavigate()
    const editor = useRef(null)
    const [content, setContent] = useState(body)

    const { register, handleSubmit } = useForm();
    const date = format(new Date(), 'PP')
    const imgHostKey = process.env.REACT_APP_imgbb_hostKey
    const handleBlogEditSubmit = data => {
        const { title, tag1, tag2, tag3 } = data
        const blogInfo = {
            title, body:content,
            tags: [tag1, tag2, tag3],
            date,
        }
        console.log(_id)
        if (data.img.length) {
            const image = data.img[0]
            const formData = new FormData()
            formData.append('image', image)
            fetch(`https://api.imgbb.com/1/upload?key=${imgHostKey}`, {
                method: 'POST',
                body: formData
            })
                .then(res => res.json())
                .then(imgData => {
                    if (imgData.success) {
                        const img = imgData.data.url;
                        const blogInfoWithImg = { ...blogInfo, img }
                        fetch(`https://portfolio-backend-sepia-seven.vercel.app/blogs/${_id}`, {
                            method: 'PUT',
                            headers: {
                                'Content-type': 'application/json'
                            },
                            body: JSON.stringify(blogInfoWithImg)
                        })
                            .then(res => res.json())
                            .then(() => {
                                toast.success("Blog updated successfully")
                                navigate('/dashboard')
                            })
                    }
                })
        }
        else {
            fetch(`https://portfolio-backend-sepia-seven.vercel.app/blogs/${_id}`, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(blogInfo)
            })
                .then(res => res.json())
                .then(() => {
                    toast.success("Blog updated successfully")
                    navigate('/dashboard/blogs')
                })
        }


    }
    return (
        <div>
            <input type="checkbox" id="blog-edit-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box w-11/12 max-w-5xl relative">
                    <label htmlFor="blog-edit-modal" className="btn btn-sm btn-error btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="font-bold text-3xl">Write a new Blog</h3>

                    <form onSubmit={handleSubmit(handleBlogEditSubmit)} className='mt-8'>
                        {/* title */}
                        <input {...register("title")} type="text" defaultValue={title} className="my-2 input input-bordered w-full" />
                        {/* tags */}
                        <input {...register("tag1")} type="text" defaultValue={tags[0]} className="my-2 mr-3 input input-bordered w-1/4" />
                        <input {...register("tag2")} type="text" defaultValue={tags[1]} className="my-2 mr-3 input input-bordered w-1/4" />
                        <input {...register("tag3")} type="text" defaultValue={tags[2]} className="my-2 mr-3 input input-bordered w-1/4" />

                        {/* blog body */}
                        <JoditEditor
                            ref={editor}
                            value={content}
                            onChange={newContent => setContent(newContent)}
                        />
                        {/* <textarea {...register("body")} type="text" defaultValue={body} className="my-2 py-2 input input-bordered w-full h-64" /> */}

                        {/* header image */}
                        <div className='text-2xl font-bold text-success mt-6'>Add a header image</div>
                        <input {...register("img")} type="file" className="my-2 input input-bordered" />

                        <div className='flex justify-center mt-10'>
                            <input type="submit" value="submit" className="btn btn-wide btn-primary text-white" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default BlogEditModal