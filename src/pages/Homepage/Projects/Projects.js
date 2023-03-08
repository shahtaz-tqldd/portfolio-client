import { useQuery } from '@tanstack/react-query'
import React from 'react'
import ProjectCard from '../../../components/Cards/ProjectCard'
import { useState } from 'react'
import ProjectModal from '../../../components/Modals/ProjectModal'
import SectionHeading from '../../../components/Typography/SectionHeading'

const Projects = () => {
    const [modal, setModal] = useState([])
    const { data: projects =[] } = useQuery({
        queryKey: ['projects'],
        queryFn: async () => {
            const res = await fetch('https://portfolio-backend-sepia-seven.vercel.app/projects')
            const data = await res.json()
            return data
        }
    })

    return (
        <section>
            <SectionHeading>My Pojects</SectionHeading>
            <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6'>
                {projects.map((project, index) => <ProjectCard key={index} project={project} index={index} setModal={setModal} />)}
            </div>

            <ProjectModal data={modal} setModal={setModal} />
        </section>
    )
}

export default Projects