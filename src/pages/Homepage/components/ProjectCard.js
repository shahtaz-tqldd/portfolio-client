import React from 'react'
import { HiExternalLink, HiServer } from 'react-icons/hi'
import { GrGithub } from 'react-icons/gr'

const ProjectCard = ({ project }) => {
    const { name, img, liveLink, description, client, server, technologies } = project
    return (
        <div className="card card-compact bg-neutral shadow-xl" data-aos="fade-up">
            <figure><img src={img} alt={name} className="h-56 object-cover" /></figure>
            <div className="card-body">
                <h2 className="card-title text-white">{name}</h2>
                <p>{description}</p>
               
                <h2 className='font-bold text-primary'>Technology</h2>
                <div className='flex flex-wrap gap-[6px] text-[11px]'>
                    {
                        technologies.map(technology => <span className='px-2 py-[2px] rounded-sm bg-[#497174] text-white'>{technology}</span>)
                    }
                </div>
            </div>
            <div className="card-actions justify-between mt-2 bg-[#393E46] p-4 rounded-b-2xl text-sm">
                {client.length > 0 && <a href={client} target="_blank" rel='noreferrer' className='text-primary hover:text-blue-500 transition duration-300 flex items-center gap-1'><GrGithub />Client Side</a>}
                {server.length > 0 && <a href={server} target="_blank" rel='noreferrer' className='text-error hover:text-red-500 transition duration-300 flex items-center gap-1'><HiServer />Server Side</a>}
                <a href={liveLink} target="_blank" rel='noreferrer' className='text-success hover:text-green-500 transition duration-300 flex items-center gap-1'><HiExternalLink />Live Website</a>
            </div>
        </div>
    )
}

export default ProjectCard