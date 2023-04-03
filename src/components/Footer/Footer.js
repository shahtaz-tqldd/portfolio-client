import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <section className='mt-20 lg:mb-10 md:mb-10 mb-24'>
            {/* <hr /> */}
            <div className='flex justify-between items-start mt-5 text-sm'>
                <p className='w-1/2 text-accent'>Allrights reserved to &copy;Shahtaz Rahman</p>
                <div className='w-1/2 flex justify-end gap-5'>
                    <Link to='/login' className='hover:text-primary transition duration-300'>Login</Link>
                    <Link to='/resource' className='hover:text-primary transition duration-300'>Resource</Link>
                </div>
            </div>
        </section>
    )
}

export default Footer