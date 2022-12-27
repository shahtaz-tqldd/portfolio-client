import React from 'react'
import { HiExternalLink, HiServer } from 'react-icons/hi'
import { VscDebugBreakpointLog } from 'react-icons/vsc'
import { GrGithub } from 'react-icons/gr'
import { PhotoProvider, PhotoView } from 'react-photo-view';

const ProjectModal = ({ project }) => {
    const { name, images, liveLink, description, client, server, technologies, features, duration } = project
    return (
        <div>
            <input type="checkbox" id="project-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box w-11/12 max-w-4xl relative">
                    <label htmlFor="project-modal" className="btn btn-sm btn-error btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="font-bold text-2xl">{name}</h3>
                    <p className="py-3">{description}</p>

                    <h2 className='font-bold text-primary mb-2 text-lg'>Features</h2>
                    <ul>
                        {
                            features.map(feature => <li className='flex items-center gap-2 mb-1'><VscDebugBreakpointLog/>{feature}</li>)
                        }
                    </ul>

                    <h2 className='font-bold text-primary mb-3 mt-4 text-lg'>Project Screenshots</h2>
                    <PhotoProvider>
                        <div className="flex flex-wrap gap-3">
                            {images.map((item, index) => (
                                <PhotoView key={index} src={item}>
                                    <img src={item} alt="" className='h-32 object-contain cursor-pointer hover:scale-105 transition duration-300 rounded-sm' />
                                </PhotoView>
                            ))}
                        </div>
                    </PhotoProvider>
                    <h2 className='font-bold text-primary mb-1 mt-5 text-lg'>Duration of the project</h2>
                    <p>{duration}</p>
                    
                    <h2 className='font-bold text-primary mb-3 mt-6 text-lg'>Technology</h2>
                    <div className='flex flex-wrap gap-[6px] text-[14px] mb-10'>
                        {
                            technologies.map(technology => <span className='px-2 py-[2px] rounded-sm bg-[#497174] text-white'>{technology}</span>)
                        }
                    </div>
                    <div className="flex flex-wrap lg:gap-10 md:gap-6 gap-2 mt-2 lf:text-md md:text-md text-sm justify-center mt-8">
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