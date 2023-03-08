import React from 'react'
import '../../assets/styles/project-card.css'
// import { HiExternalLink, HiServer } from 'react-icons/hi'
// import { GrGithub } from 'react-icons/gr'

const ProjectCard = ({ project, setModal, index }) => {
    const { name, img, liveLink, description } = project
    const colors = ['#8DCBE6', '#B6EADA', '#F3CCFF', '#FFFBAC'];

    return (
        <div
            className="h-[300px] project-card hover:shadow-lg"
            style={{ backgroundColor: colors[index % colors.length] }}
            data-aos="fade-up"
            data-aos-delay={`${((index) % 3) * 100 + 100}`}
        >
            <img src={img} alt="" className='h-full w-full object-contain p-3' />

            <div className='project-card-content'>
                <div className='m-5'>
                    <h1 className='text-2xl font-bold'>{name}</h1>
                    <p className='text-sm'>{description}</p>
                    <div className='flex gap-5 mt-4'>
                        <a href={liveLink} target="_blank" rel="noreferrer">
                            <button className='btn btn-outline rounded-md normal-case px-5 flex items-center gap-1'>
                                <span className='color-green'>Live site</span>
                                <lord-icon
                                    target="button"
                                    src="https://cdn.lordicon.com/zmkotitn.json"
                                    trigger="hover"
                                    colors="primary:#16c79e,secondary:#f4f19c"
                                    style={{ height: "20px", width: "20px" }}>
                                </lord-icon>

                            </button>
                        </a>
                        <label htmlFor='project-modal' onClick={() => setModal(project)} className='btn rounded-md normal-case px-4 flex items-center gap-1'>
                            <lord-icon
                                target="label"
                                src="https://cdn.lordicon.com/kulwmpzs.json"
                                trigger="hover"
                                colors="primary:#fff,secondary:#fff"
                                style={{ height: "20px", width: "20px" }}>
                            </lord-icon>
                            <span className='text-white'>See Details</span>
                        </label>

                    </div>
                </div>
            </div>
            <div className='overlay'></div>
        </div>
    )
}

export default ProjectCard