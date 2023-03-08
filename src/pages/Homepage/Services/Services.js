import React from 'react'
import ServiceCard from '../../../components/Cards/ServiceCard'
import SectionHeading from '../../../components/Typography/SectionHeading'

const Services = () => {
    const services = [
        {
            "id": 1,
            "service": "Frontend Web Development",
            "details": "I am working as a frontend web developer for more than 1 year. I can convert any psd or Figma file into mobile or tab responsive web application. Capable of doing project in clean code."
        },
        {
            "id": 2,
            "service": "React JS Development",
            "details": "Working as a React JS developer for more than a year. I have worked on 8 different React JS projcts. Also have a little working experience with Next JS."
        },
        {
            "id": 3,
            "service": "Full Stack Development",
            "details": "Along with the Frontend I am skilled in Node JS, Express, JWT and Firebase. Proficient in implementing Mongo DB database. More than 6 months of experience with Full Stack development."
        },
    ]
    return (
        <section>
            <SectionHeading>Services</SectionHeading>
            <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6'>
                {
                    services.map(service => <ServiceCard key={service.id} service={service} />)
                }
            </div>
        </section>
    )
}

export default Services