import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { HiExternalLink, HiServer } from 'react-icons/hi'
import { GrGithub } from 'react-icons/gr'
import ProjectAddModal from '../components/ProjectAddModal'

const ProjectDashboard = () => {
    const { data: projects = [] } = useQuery({
        queryKey: ['projects'],
        queryFn: async () => {
            const res = await fetch('https://portfolio-backend-sepia-seven.vercel.app/projects')
            const data = await res.json()
            return data
        }
    })
    return (
        <div className='w-full'>
            <div className='flex items-center justify-between'>
                <h1 className='text-4xl font-bold uppercase'>Projects</h1>
                <label htmlFor='project-modal' className='btn btn-sm normal-case rounded-sm text-white btn-success'>Add Project + </label>
            </div>

            {/* project table */}
            <div className="overflow-x-auto mt-8">
                <table className="table w-full z-0">
                    <thead>
                        <tr className='text-success'>
                            <th></th>
                            <th>Project Name</th>
                            <th>Link</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            projects.map((project, i) => <tr key={i}>
                                <th>{i + 1}</th>
                                <td>{project.name}</td>
                                <td>
                                    <div className="text-xl flex gap-4">
                                        {project.client.length > 0 && <a href={project.client} target="_blank" rel='noreferrer' className='text-primary hover:text-base-content transition duration-300 flex items-center gap-1'><GrGithub /></a>}
                                        {project.server.length > 0 && <a href={project.server} target="_blank" rel='noreferrer' className='text-error hover:text-base-content transition duration-300 flex items-center gap-1'><HiServer /></a>}
                                        <a href={project.liveLink} target="_blank" rel='noreferrer' className='text-success hover:text-base-content transition duration-300 flex items-center gap-1'><HiExternalLink /></a>
                                    </div>

                                </td>
                                <td><button className='btn btn-ghost rounded text-primary normal-case'>Update</button></td>
                                <td><button className='btn btn-ghost rounded text-error normal-case'>Delete</button></td>
                            </tr>
                            )
                        }

                    </tbody>
                </table>
            </div>
            <ProjectAddModal />
        </div>
    )
}

export default ProjectDashboard