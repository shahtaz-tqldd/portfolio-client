import React from 'react'
import { HiExternalLink, HiServer } from 'react-icons/hi'
import { GrGithub } from 'react-icons/gr'
import { PhotoProvider, PhotoView } from 'react-photo-view';

const ProjectModal = ({ project }) => {
    const { name, images, liveLink, description, client, server, technologies } = project
    return (
        <div>
            <input type="checkbox" id="project-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box w-11/12 max-w-5xl relative">
                    <label htmlFor="project-modal" className="btn btn-sm btn-error btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="font-bold text-2xl">{name}</h3>
                    <p className="py-4">{description}</p>

                    <h2 className='font-bold text-primary mb-3 text-lg'>Project Screenshots</h2>
                    <PhotoProvider>
                        <div className="flex gap-3">
                            {images.map((item, index) => (
                                <PhotoView key={index} src={item}>
                                    <img src={item} alt="" className='h-32 object-contain cursor-pointer hover:scale-105 transition duration-300 rounded-md' />
                                </PhotoView>
                            ))}
                        </div>
                    </PhotoProvider>

                    <h2 className='font-bold text-primary mb-3 mt-6 text-lg'>Technology</h2>
                    <div className='flex flex-wrap gap-[6px] text-[14px]'>
                        {
                            technologies.map(technology => <span className='px-2 py-[2px] rounded-sm bg-[#497174] text-white'>{technology}</span>)
                        }
                    </div>
                    <div className="flex gap-10 mt-2 text-md justify-center mt-8">
                        {client.length > 0 && <a href={client} target="_blank" rel='noreferrer' className='text-primary hover:text-blue-500 transition duration-300 flex items-center gap-1'><GrGithub />Client Side</a>}
                        {server.length > 0 && <a href={server} target="_blank" rel='noreferrer' className='text-error hover:text-red-500 transition duration-300 flex items-center gap-1'><HiServer />Server Side</a>}
                        <a href={liveLink} target="_blank" rel='noreferrer' className='text-success hover:text-green-500 transition duration-300 flex items-center gap-1'><HiExternalLink />Live Website</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProjectModal