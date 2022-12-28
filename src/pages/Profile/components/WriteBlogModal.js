import { format } from 'date-fns';
import JoditEditor from 'jodit-react';
import React, { useRef, useState } from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const WriteBlogModal = () => {
    const navigate = useNavigate()
    const editor = useRef(null)
    const [content, setContent] = useState('')
    const { register, handleSubmit, formState: { errors } } = useForm();
    const date = format(new Date(), 'PP')
    const imgHostKey = process.env.REACT_APP_imgbb_hostKey

    const handleBlogSubmit = data => {
        const { title, tag1, tag2, tag3 } = data
        const image = data.img[0]
        const blogInfo = {
            title, body:content,
            tags: [tag1, tag2, tag3],
            date,
        }
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

                    fetch('https://portfolio-backend-sepia-seven.vercel.app/blogs', {
                        method: 'POST',
                        headers: {
                            'Content-type': 'application/json'
                        },
                        body: JSON.stringify(blogInfoWithImg)
                    })
                        .then(res => res.json())
                        .then(() => {
                            toast.success("Blog added successfully")
                            navigate('/blogs')
                        })
                }
            })


    }
    return (
        <div>
            <input type="checkbox" id="blog-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box w-11/12 max-w-5xl relative">
                    <label htmlFor="blog-modal" className="btn btn-sm btn-error btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="font-bold text-3xl">Write a new Blog</h3>

                    <form onSubmit={handleSubmit(handleBlogSubmit)} className='mt-8'>
                        {/* title */}
                        <input {...register("title", { required: "This field can not be empty" })} type="text" placeholder="Title of the Blog" className="my-2 input input-bordered w-full" />
                        {errors.title && <span className='text-error'>{errors.title.message}</span>}
                        {/* tags */}
                        <input {...register("tag1", { required: "This field can not be empty" })} type="text" placeholder="tag-1" className="my-2 mr-3 input input-bordered w-1/4" />
                        {errors.tag1 && <span className='text-error'>{errors.tag1.message}</span>}

                        <input {...register("tag2", { required: "This field can not be empty" })} type="text" placeholder="tag-2" className="my-2 mr-3 input input-bordered w-1/4" />
                        {errors.tag2 && <span className='text-error'>{errors.tag2.message}</span>}

                        <input {...register("tag3", { required: "This field can not be empty" })} type="text" placeholder="tag-3" className="my-2 mr-3 input input-bordered w-1/4" />
                        {errors.tag3 && <span className='text-error'>{errors.tag3.message}</span>}

                        {/* blog body */}
                        <JoditEditor
                            ref={editor}
                            value={content}
                            onChange={newContent => setContent(newContent)}
                            className="text-[#000]"
                        />

                        {/* header image */}
                        <div className='text-2xl font-bold text-success mt-6'>Add a header image</div>
                        <input {...register("img", { required: "This field can not be empty" })} type="file" className="my-2 input input-bordered" />
                        {errors.img && <span className='text-error'>{errors.img.message}</span>}

                        <div className='flex justify-center mt-10'>
                            <input type="submit" value="submit" className="btn btn-wide btn-primary text-white" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default WriteBlogModal