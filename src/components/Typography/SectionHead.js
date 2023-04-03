import React from 'react'

const SectionHead = ({ children }) => {
    return (
        <h2 className='lg:text-5xl md:text-4xl text-3xl lg:leading-[60px] md:leading-[45px] leading-[36px] mt-12 mb-10 max-w-[670px]'>
            {children}
        </h2>
    )
}

export default SectionHead