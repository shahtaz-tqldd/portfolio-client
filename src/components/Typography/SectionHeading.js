import React from 'react'

const SectionHeading = ({children}) => {
  return (
    <h1 className='lg:text-6xl md:text-4xl text-3xl mb-12 mt-32 font-bold text-center' style={{fontFamily: "'Montserrat', sans-sherif"}}>{children}</h1>
  )
}

export default SectionHeading