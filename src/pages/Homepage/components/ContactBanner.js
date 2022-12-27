import React from 'react'
import { Link } from 'react-router-dom'

const ContactBanner = () => {
    return (
        <div data-aos="fade-up" className='flex lg:flex-row md:flex-row flex-col px-10 py-12 rounded-xl bg-secondary'>
            <div className='lg:w-2/3 md:w-2/3'>
                <h1 className='lg:text-5xl md:text-5xl text-2xl font-bold text-white mb-3'>
                    <span className='lg:text-3xl md:text-3xl text-lg font-normal'>
                        Are you looking for a
                    </span><br />
                    Web Developer ?
                </h1>
            </div>
            <div className='lg:w-1/3 md:w-1/3 flex justify-center items-center'>
                <Link to='/contact'>
                    <button className='btn btn-warning text-white rounded-full normal-case lg:btn-md md:btn-md btn-sm'>
                        Contact Me
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default ContactBanner