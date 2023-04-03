import React from 'react'
import { HiCode, HiServer } from 'react-icons/hi'
import { GrGithub } from 'react-icons/gr'
import { BsCamera } from 'react-icons/bs'
import { MdOutlineCalendarToday, MdOutlineFeaturedPlayList } from 'react-icons/md'
import { PhotoProvider, PhotoView } from 'react-photo-view';

const ProjectModal = ({ data }) => {
    const { name, description, features, duration, technologies, liveLink, client, server, images } = data
    return (
        <div>
            <input type="checkbox" id="project-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box w-11/12 max-w-5xl relative">
                    <label htmlFor="project-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <div>
                        {/* PROJECT NAME & LIVE SITE BUTTON */}
                        <div className='flex justify-between lg:pr-8 pr-3'>
                            <h3 className="text-3xl font-bold text-primary">{name}</h3>
                            <a href={liveLink} target="_blank" rel='noreferrer' className='btn btn-primary btn-sm rounded-full px-5 normal-case transition duration-300'>Live Site</a>
                        </div>

                        {/* DESCRIPTION */}
                        <p className="pt-3 mb-8 text-accent text-xl">{description}</p>

                        <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5'>
                            <div>
                                {/* FEATURES */}
                                <div>
                                    <h2 className='mb-4 flex items-center gap-2 text-white text-xl'> <MdOutlineFeaturedPlayList />Key Features</h2>
                                    <ul className='text-accent'>
                                        {
                                            features?.map((feature, index) => <li className='text-sm flex items-start gap-2 mb-2' key={index}>
                                                <span className='h-4 w-4'>
                                                    <lord-icon
                                                        target="li"
                                                        src="https://cdn.lordicon.com/yqzmiobz.json"
                                                        trigger="hover"
                                                        colors="primary:#16c79e"
                                                        style={{ width: "16px", height: "16px" }}>
                                                    </lord-icon>
                                                </span>
                                                {feature}
                                            </li>)
                                        }
                                    </ul>
                                </div>
                                {/* DURATION */}
                                <div>
                                    <h2 className='mb-4 flex items-center gap-2 text-white mt-10 text-xl'><MdOutlineCalendarToday />Duration of completion</h2>
                                    <p className='text-sm text-accent'>{duration}</p>
                                </div>
                            </div>

                            <div>
                                {/* TECHNOLOGY STACK */}
                                <div>
                                    <h2 className='mb-4 flex items-center gap-2 text-white text-xl'><HiCode />Technology Stack</h2>
                                    <div className='flex flex-wrap gap-2 text-base-100'>
                                        {
                                            technologies?.map((tech, index) => <span
                                                className={`py-1 px-3 text-xs ${((index % 4) === 0 && 'bg-[#DDF7E3]') ||
                                                    ((index % 3) === 0 && 'bg-[#F6F7C1]') ||
                                                    ((index % 2) === 0 && 'bg-[#DEFCF9]') ||
                                                    'bg-[#FFD4D4]'}`}>
                                                {tech}
                                            </span>)
                                        }
                                    </div>
                                </div>
                                {/* SOURCE CODE */}
                                <div>
                                    <h2 className='mb-4 flex items-center gap-2 text-white mt-10 text-xl'><GrGithub />Source Code</h2>
                                    <div className="flex gap-5 text-sm">
                                        {client?.length > 0 && <a href={client} target="_blank" rel='noreferrer' className='text-primary hover:text-blue-500 transition duration-300 flex items-center gap-1'><GrGithub />Client Side</a>}
                                        {server?.length > 0 && <a href={server} target="_blank" rel='noreferrer' className='text-error hover:text-red-500 transition duration-300 flex items-center gap-1'><HiServer />Server Side</a>}
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h2 className='mb-4 flex items-center gap-2 text-white text-xl'><BsCamera />Project Screenshots</h2>
                                <PhotoProvider>
                                    <div className="flex flex-wrap gap-3">
                                        {images?.map((item, index) => (
                                            <PhotoView key={index} src={item}>
                                                <img src={item} alt="" className='h-32 object-contain cursor-pointer hover:scale-105 transition duration-300 rounded-sm' />
                                            </PhotoView>
                                        ))}
                                    </div>
                                </PhotoProvider>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProjectModal