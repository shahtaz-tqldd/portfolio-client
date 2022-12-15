import React from 'react'
import { GrFacebookOption, GrGithub, GrLinkedinOption } from 'react-icons/gr'
import { Link } from 'react-router-dom'

const Navbar = () => {
    const navMenuItems = <>
        <li><a href='https://drive.google.com/file/d/1lV9dIwZU1Ede97Fao-GY1s3EjLPyjvO-/view?usp=share_link' target="_blank" rel="noreferrer">Resume</a></li>
        <li><Link to='/blogs'>Blogs</Link></li>
        <li><Link to='/contact'>Contact Me</Link></li>
    </>
    return (
        <div className='bg-[#2B3A55] fixed top-0 left-0 right-0 z-10'>
            <div className="navbar max-w-[1250px] mx-auto">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            {navMenuItems}
                        </ul>
                    </div>
                    <Link to='/' className="normal-case text-2xl text-primary">Shahtaz R.</Link>
                </div>
                <div className="navbar-end hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navMenuItems}
                    </ul>
                </div>
                <div className='flex gap-3 text-white ml-8'>
                    <a target='_blank' rel="noreferrer" href='https://www.facebook.com/shahtaz.rahman.3/' className='border-[1px] p-[5px] rounded-full hover:bg-primary transition duration-300'><GrFacebookOption/></a>
                    <a target='_blank' rel="noreferrer" href='https://www.linkedin.com/in/shahtazrahman/' className='border-[1px] p-[5px] rounded-full hover:bg-primary transition duration-300'><GrLinkedinOption/></a>
                    <a target='_blank' rel="noreferrer" href='https://github.com/shahtaz-tqldd/' className='text-[28px] hover:text-primary transition duration-300'><GrGithub/></a>
                </div>
            </div>
        </div>
    )
}

export default Navbar