import React from 'react'
import { GrFacebookOption, GrGithub, GrLinkedinOption } from 'react-icons/gr'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <div className='bg-[#2B3A55] mt-20'>
            <footer className="footer footer-center p-10 text-base-content rounded max-w-[1250px] mx-auto">
                <div className="grid grid-flow-col gap-4">
                    <Link to='/' className="link link-hover">Home</Link>
                    <Link to='/blogs' className="link link-hover">Blogs</Link>
                    <Link to='/contact' className="link link-hover">Contact Me</Link>
                    <Link to='/resume' className="link link-hover">Resume</Link>
                </div>
                <div>
                    <div className="grid grid-flow-col gap-4 text-white">
                    <a target='_blank' rel="noreferrer" href='https://www.facebook.com/shahtaz.rahman.3/' className='border-[1px] p-[5px] rounded-full hover:bg-primary transition duration-300'><GrFacebookOption/></a>
                    <a target='_blank' rel="noreferrer" href='https://www.linkedin.com/in/shahtazrahman/' className='border-[1px] p-[5px] rounded-full hover:bg-primary transition duration-300'><GrLinkedinOption/></a>
                    <a target='_blank' rel="noreferrer" href='https://github.com/shahtaz-tqldd/' className='text-[28px] hover:text-primary transition duration-300'><GrGithub/></a>
                    </div>
                </div>
                <div>
                    <p>Copyright © 2022 - All right reserved by Shahtaz Rahman</p>
                </div>
            </footer>
        </div>
    )
}

export default Footer