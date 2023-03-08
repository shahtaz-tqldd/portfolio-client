import React from 'react'

const ServiceCard = ({ service }) => {
    const { service: name, details } = service
    return (
        <div className='bg-white p-5 rounded-2xl text-center flex flex-col items-center hover:shadow-lg cursor-pointer' data-aos="fade-up">
            <lord-icon
                target="div"
                src="https://cdn.lordicon.com/wluyqhxh.json"
                trigger="hover"
                style={{ width: "60px", height: "60px" }}>
            </lord-icon>
            <h2 className='font-bold text-xl color-green my-3'>{name}</h2>
            <p className='text-sm'>{details}</p>
        </div>
    )
}

export default ServiceCard