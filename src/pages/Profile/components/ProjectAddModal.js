import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const ProjectAddModal = () => {
    const navigate = useNavigate()
    const [techBtn, setTechBtn] = useState(0)
    const [ftrBtn, setFtrBtn] = useState(0)
    // const [imgBtn, setImgBtn] = useState(0)
    let techBtnNum = [1]
    for (let i = 0; i < techBtn; i++) {
        techBtnNum.push(1)
    }
    let ftrBtnNum = [1]
    for (let i = 0; i < ftrBtn; i++) {
        ftrBtnNum.push(1)
    }
    // let imgBtnNum = [1]
    // for (let i = 0; i < imgBtn; i++) {
    //     imgBtnNum.push(1)
    // }
    const technologies = <>
        <option>HTML</option>
        <option>CSS</option>
        <option>TAilwind CSS</option>
        <option>Bootstrap</option>
        <option>JavaScript</option>
        <option>React JS</option>
        <option>Node JS</option>
        <option>Express</option>
        <option>Firebase</option>
        <option>JWT Authentication</option>
        <option>Mongo DB</option>
    </>

    const imgHostKey = process.env.REACT_APP_imgbb_hostKey

    const { register, handleSubmit, formState: { errors } } = useForm();
    const handleProjectSubmit = data => {
        const { name, details, strtDate, endDate, client, server, liveLink } = data
        let technologies = [];
        for (const key in data) {
            key.includes('tech') && technologies.push(`${data[key]}`)
        }
        let features = [];
        for (const key in data) {
            key.includes('feature') && features.push(`${data[key]}`)
        }
        const allInfo = {
            name,
            description: details,
            images: [
                "https://i.ibb.co/PmzgHt4/book-Shore.png",
            ],
            features,
            duration: strtDate + ' - ' + endDate,
            technologies,
            client,
            server,
            liveLink
        }
        const image = data.img[0]
        const formData = new FormData()
        formData.append('image', image)
        console.log(formData)
        fetch(`https://api.imgbb.com/1/upload?key=${imgHostKey}`, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {
                    const img = imgData.data.url;
                    const projectInfo = { ...allInfo, img }
                    fetch('https://portfolio-backend-sepia-seven.vercel.app/projects', {
                        method: 'POST',
                        headers: {
                            'Content-type': 'application/json'
                        },
                        body: JSON.stringify(projectInfo)
                    })
                        .then(res => res.json())
                        .then(() => {
                            toast.success("Project added successfully")
                            navigate('/dashboard')
                        })
                }
            }
            )
    }
    return (
        <div>
            <input type="checkbox" id="project-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box w-11/12 max-w-5xl relative">
                    <label htmlFor="project-modal" className="btn btn-sm btn-error btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="font-bold text-3xl">Add a new project</h3>

                    <form onSubmit={handleSubmit(handleProjectSubmit)} className='mt-8'>

                        <input {...register("name", { required: "This field can not be empty" })} type="text" placeholder="Project Name" className="my-2 input input-bordered w-1/2" />
                        {errors.name && <span className='text-error'>{errors.name.message}</span>}

                        <input {...register("details", { required: "This field can not be empty" })} type="text" placeholder="Project Details" className="my-2 input input-bordered w-full" />
                        {errors.details && <span className='text-error'>{errors.details.message}</span>}

                        <h2 className='text-2xl text-success font-bold mt-5'>Project features</h2>
                        {
                            ftrBtnNum.map((ftr, index) => <input {...register(`feature-${index + 1}`,
                                { required: "This field can not be empty" })}
                                type="text" placeholder="Features" className="my-2 input input-bordered w-full" />
                            )
                        }
                        <button onClick={() => setFtrBtn(ftrBtn + 1)} className='btn'>Add more +</button><br />

                        <h2 className='text-2xl text-success font-bold mt-5'>Duration of the projcet</h2>
                        <input {...register("strtDate", { required: "This field can not be empty" })} type="text" placeholder="Starting date" className="my-2 mr-4 input input-bordered w-1/3" />
                        {errors.strtDate && <span className='text-error'>{errors.strtDate.message}</span>}

                        <input {...register("endDate", { required: "This field can not be empty" })} type="text" placeholder="Ending date" className="my-2 input input-bordered w-1/3" />
                        {errors.endDate && <span className='text-error'>{errors.endDate.message}</span>}

                        <h2 className='text-2xl text-success font-bold mt-5'>Technology</h2>
                        {
                            techBtnNum.map((tech, index) => <select {...register(`tech-${index + 1}`, { required: "This field can not be empty" })} type="text" placeholder="technology" className="my-2 mr-3 input input-bordered w-1/4">
                                {technologies}
                            </select>)
                        }
                        <button onClick={() => setTechBtn(techBtn + 1)} className='btn'>Add more +</button><br />

                        <h2 className='text-2xl text-success font-bold mt-5'>Links</h2>

                        <input {...register("client", { required: "This field can not be empty" })} type="text" placeholder="Client Side" className="my-2 input input-bordered w-1/2" /><br />
                        {errors.client && <span className='text-error'>{errors.client.message}</span>}

                        <input {...register("server", { required: "This field can not be empty" })} type="text" placeholder="Server Side" className="my-2 input input-bordered w-1/2" /><br />
                        {errors.server && <span className='text-error'>{errors.server.message}</span>}

                        <input {...register("liveLink", { required: "This field can not be empty" })} type="text" placeholder="Live Link" className="my-2 input input-bordered w-1/2" />
                        {errors.liveLink && <span className='text-error'>{errors.liveLink.message}</span>}

                        <h2 className='text-2xl text-success font-bold mt-5 mb-3'>Upload a image</h2>
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

export default ProjectAddModal