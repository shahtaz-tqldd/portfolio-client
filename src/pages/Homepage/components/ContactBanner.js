import React from 'react'
import { Link } from 'react-router-dom'

const ContactBanner = () => {
    return (
        <div data-aos="fade-up" className='flex bg-secondary px-10 py-12 rounded-xl'
            style={{
                backgroundImage: `url("https://glivera-team.com/wp-content/uploads/2019/11/fronend-prt.jpg")`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: "cover",
                backgroundPosition: "center"
                
            }}>
            <div className='w-2/3'>
                <h1 className='text-5xl font-bold text-white'><span className='text-3xl font-normal'>Are you looking for a</span> <br/> Web Developer</h1>
            </div>
            <div className='w-1/3 flex justify-center items-center'>
                <Link to='/contact'><button className='btn btn-primary rounded-full normal-case px-12'>Contact Me</button></Link>
            </div>
        </div>
    )
}

export default ContactBanner