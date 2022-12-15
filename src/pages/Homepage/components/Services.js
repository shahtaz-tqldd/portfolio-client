import React from 'react'
import ServiceCard from './ServiceCard'

const Services = () => {
    const services = [
        {
            "id": 1,
            "service": "Frontend Web Development",
            "details": "I am working as a frontend web developer for more than 1 year. I am skilled in HTML, CSS, JavaScript, Bootstrap, Tailwind css and React JS. I can convert any psd or Figma file into mobile responsive web application."
        },
        {
            "id": 2,
            "service": "React JS Development",
            "details": "I am working as a React JS developer for more than a year. I have worked on 8 different React JS projcts. Also I have a little working experience with Next JS."
        },
        {
            "id": 3,
            "service": "Full Stack Development",
            "details": "Along with the Frontend I am skilled in Node JS, Express, JWT and Firebase. I am proficient in implementing Mongo DB database. I have more than 6 months experience of Full Stack web development."
        },
    ]
    return (
        <>
            <h1 className='text-5xl font-bold text-center mb-16 mt-24'>Services</h1>
            <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6'>
                {
                    services.map(service => <ServiceCard key={service.id} service={service} />)
                }
            </div>
        </>
    )
}

export default Services