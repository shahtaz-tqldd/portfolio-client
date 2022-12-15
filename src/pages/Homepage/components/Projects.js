import React from 'react'
import ProjectCard from './ProjectCard'
import bookShrore from '../../../assets/images/bookShore.png'
import adornment from '../../../assets/images/adornment.png'
import adaAcademy from '../../../assets/images/adaAcademy.png'
import esteTeri from '../../../assets/images/esteTeri.png'
import foodieHub from '../../../assets/images/foodieHub.png'

const Projects = () => {
    const projects = [
        {
            "id": 1,
            "name": "Bookshore",
            "img": bookShrore,
            "description":"A ecommerce website for buying and selling second-hand books",
            "technologies": ["HTML", "CSS", "Tailwind", "Daisy UI", "React JS", "Node JS", "Express", "Firebase", "JWT Authentication", "Mongo DB"],
            "client":"https://github.com/shahtaz-tqldd/bookshore-client",
            "server":"https://github.com/shahtaz-tqldd/bookshore-server",
            "liveLink":"https://bookshore-cd9c4.web.app/"
        },
        {
            "id": 2,
            "name": "Adornment",
            "img": adornment,
            "description":"A service reviewing website for a Interior Desginer",
            "technologies": ["HTML", "CSS", "React JS", "Node JS", "Express", "Firebase", "JWT Authentication", "Mongo DB"],
            "client":"https://github.com/shahtaz-tqldd/adornment-client",
            "server":"https://github.com/shahtaz-tqldd/adornment-server",
            "liveLink":"https://adornment-5bfe9.web.app/"
        },
        {
            "id": 3,
            "name": "Ada Academy",
            "img": adaAcademy,
            "description":"Online programming courses Enrolling website",
            "technologies": ["HTML", "CSS", "Bootstrap","React JS", "Node JS", "Express", "Firebase"],
            "client":"https://github.com/shahtaz-tqldd/ada-academy",
            "server":"",
            "liveLink":"https://ada-academy.web.app/"
        },
        {
            "id": 4,
            "name": "Esteteri",
            "img": esteTeri,
            "description":"Property rent website with 4 layer filtering search functionality",
            "technologies": ["HTML", "CSS", "Tailwind", "Daisy UI", "React JS", "Node JS", "Express"],
            "client":"https://github.com/shahtaz-tqldd/estetery",
            "server":"https://github.com/shahtaz-tqldd/estetery-server",
            "liveLink":"https://estetery-search.netlify.app/"
        },
        {
            "id": 5,
            "name": "Foodie Hub",
            "img": foodieHub,
            "description":"A food recipee website",
            "technologies": ["HTML", "CSS", "JavaScript", "REST API"],
            "client":"",
            "server":"",
            "liveLink":"https://foodie-hub1.netlify.app/"
        },
    ]
    return (
        <>

            <h1 className='text-5xl font-bold text-center mb-16'>Project Showcase</h1>
            <div className='grid lg:grid-cols-3 gap-6'>
                {projects.map(project => <ProjectCard key={project.id} project={project} />)}
            </div>
        </>
    )
}

export default Projects