import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthProvider'
import SocialLinks from '../SocialLinks'

const Footer = () => {
    const {user} = useContext(AuthContext)
    return (
        <div className='bg-[#222] mt-20'>
            <footer className="footer footer-center p-10 text-white rounded max-w-[1250px] mx-auto">
                <div className="grid grid-flow-col gap-4">
                    <Link to='/' className="link link-hover">Home</Link>
                    <Link to='/blogs' className="link link-hover">Blogs</Link>
                    <Link to='/contact' className="link link-hover">Contact Me</Link>
                    <a href='https://drive.google.com/file/d/1lV9dIwZU1Ede97Fao-GY1s3EjLPyjvO-/view?usp=share_link' target="_blank" rel="noreferrer">Resume</a>
                    { !user && <Link to='/login' className="link link-hover">Login</Link>}
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