import React from 'react'
import '../../assets/styles/project-card.css'
// import { HiExternalLink, HiServer } from 'react-icons/hi'
// import { GrGithub } from 'react-icons/gr'

const ProjectCard = ({ project, setModal, index }) => {
    const { name, img, liveLink, description } = project
    return (
        <div
            className="h-[300px] project-card hover:shadow-lg border-[1px] border-accent rounded-2xl"
            data-aos="fade-up"
            data-aos-delay={`${((index) % 2) * 100 + 100}`}
        >
            <img src={img} alt="" className='h-full w-full object-contain p-3' />

            <div className='project-card-content'>
                <div className='m-7'>
                    <h1 className='text-2xl font-bold'>{name}</h1>
                    <p className='mt-3'>{description}</p>
                    <div className='flex gap-4 mt-12'>
                        <a href={liveLink} target="_blank" rel="noreferrer">
                            <button className='btn btn-sm text-sm normal-case rounded-full px-5 hover:btn-primary'>
                            Live Site
                            </button>
                        </a>
                        <label htmlFor='project-modal' onClick={() => setModal(project)} className='btn btn-sm normal-case rounded-full px-7 hover:btn-primary'>
                            Details
                        </label>

                    </div>
                </div>
            </div>
            <div className='overlay'></div>
        </div>
    )
}

export default ProjectCard