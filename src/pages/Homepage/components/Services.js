import React from 'react'
import ServiceCard from './ServiceCard'

const Services = () => {
    const services = [
        {
            "id": 1,
            "service": "Frontend Web Development",
            "details": "I have working experiences of 1 year of frontend web development"
        },
        {
            "id": 2,
            "service": "React JS Development",
            "details": "I have working experiences of 1 year of frontend web development"
        },
        {
            "id": 3,
            "service": "Full Stack Development",
            "details": "I have working experiences of 1 year of frontend web development"
        },
    ]
    return (
        <>
        
        <h1 className='text-5xl font-bold text-center mb-16'>Services</h1>
        <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6'>
            {
                services.map(service => <ServiceCard key={service.id} service={service} />)
            }
        </div>
        </>
    )
}

export default Services