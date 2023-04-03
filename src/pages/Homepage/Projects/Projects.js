import { useQuery } from '@tanstack/react-query'
import ProjectCard from '../../../components/Cards/ProjectCard'
import React, { useState } from 'react'
import ProjectModal from '../../../components/Modals/ProjectModal'
import SectionTitle from '../../../components/Typography/SectionTitle'
import SectionHead from '../../../components/Typography/SectionHead'
import { Link } from 'react-router-dom'

const Projects = () => {
    const [modal, setModal] = useState([])
    const { data: projects = [] } = useQuery({
        queryKey: ['projects'],
        queryFn: async () => {
            const res = await fetch('https://portfolio-backend-sepia-seven.vercel.app/projects')
            const data = await res.json()
            return data
        }
    })
    const props = { img: "https://cdn.lordicon.com/fpmskzsv.json", text: "My Projects" }
    return (
        <section id="projects" className='mb-20'>
            <SectionTitle props={props} />
            <SectionHead>
                Featured <span className='text-primary'>Projects</span>
            </SectionHead>
            <div className='projects'>
                {projects?.slice(0, 4).map((project, index) => <ProjectCard key={index} project={project} index={index} setModal={setModal} />)}
            </div>
            <div className='mt-16 flex justify-end'>
                <Link to='/projects' className='text-xl flex items-center gap-2 icon hover:text-primary transition duration-300'>
                    All Projects
                    <lord-icon
                        target="a"
                        src="https://cdn.lordicon.com/zmkotitn.json"
                        trigger="hover"
                        class="current-color"
                        style={{ width: "25px", height: "25px", margintTop: "4px" }}>
                    </lord-icon>
                </Link>
            </div>
            <ProjectModal data={modal} setModal={setModal} />
        </section>
    )
}

export default Projects