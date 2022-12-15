import React from 'react'
import { BsCodeSlash } from 'react-icons/bs'

const ServiceCard = ({ service }) => {
    const { service: name, details } = service
    return (
        <div className='bg-[#222] p-5 rounded-lg text-center flex flex-col items-center' data-aos="fade-up">
            <BsCodeSlash className='text-5xl mb-3' />
            <h2 className='font-bold text-xl text-success mb-3'>{name}</h2>
            <p>{details}</p>
        </div>
    )
}

export default ServiceCard