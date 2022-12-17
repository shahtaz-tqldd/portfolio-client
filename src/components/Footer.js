import React from 'react'
import { Link } from 'react-router-dom'
import SocialLinks from './SocialLinks'

const Footer = () => {
    return (
        <div className='bg-secondary mt-20'>
            <footer className="footer footer-center p-10 text-base-content rounded max-w-[1250px] mx-auto">
                <div className="grid grid-flow-col gap-4">
                    <Link to='/' className="link link-hover">Home</Link>
                    <Link to='/blogs' className="link link-hover">Blogs</Link>
                    <Link to='/contact' className="link link-hover">Contact Me</Link>
                    <Link to='/resume' className="link link-hover">Resume</Link>
                </div>
                <div>
                    <SocialLinks/>
                </div>
                <div>
                    <p>Copyright © 2022 - All right reserved by Shahtaz Rahman</p>
                </div>
            </footer>
        </div>
    )
}

export default Footer