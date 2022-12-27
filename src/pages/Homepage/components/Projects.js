import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import ProjectCard from './ProjectCard'
import ProjectModal from './ProjectModal'

const Projects = () => {
    const [selected, setSelected] = useState(null)
    const { data: projects =[] } = useQuery({
        queryKey: ['projects'],
        queryFn: async () => {
            const res = await fetch('https://portfolio-backend-sepia-seven.vercel.app/projects')
            const data = await res.json()
            return data
        }
    })
    
    return (
        <>
            <h1 className='lg:text-5xl md:text-4xl text-3xl mb-12 mt-20 font-bold text-center'>Project Showcase</h1>
            <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6'>
                {projects.map(project => <ProjectCard key={project.id} project={project} setSelected={setSelected} />)}
            </div>
            {
                selected &&
                <ProjectModal project={selected} />
            }
        </>
    )
}

export default Projects