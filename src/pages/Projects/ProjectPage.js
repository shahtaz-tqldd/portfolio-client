import React, { useState } from 'react'
import SectionTitle from '../../components/Typography/SectionTitle'
import SectionHead from '../../components/Typography/SectionHead'
import ProjectCard from '../../components/Cards/ProjectCard'
import { useQuery } from '@tanstack/react-query'
import useTitle from '../../hooks/useTitle'
import ProjectModal from '../../components/Modals/ProjectModal'

const ProjectPage = () => {
    useTitle('Projects')
    const [modal, setModal] = useState([])
    const { data: projects = [] } = useQuery({
        queryKey: ['projects'],
        queryFn: async () => {
            const res = await fetch('https://portfolio-backend-sepia-seven.vercel.app/projects')
            const data = await res.json()
            return data
        }
    })
    const props = { img: "https://cdn.lordicon.com/fpmskzsv.json", text: "Projects" }
    return (
        <section>
            <SectionTitle props={props} />
            <SectionHead>My <span className='text-primary'>Projects</span></SectionHead>

            <div className='projects'>
                {projects?.map((project, index) => <ProjectCard key={index} project={project} index={index} setModal={setModal} />)}
            </div>
            <ProjectModal data={modal} setModal={setModal} />
        </section>
    )
}

export default ProjectPage