import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import SocialLinks from '../SocialLinks'
import { AuthContext } from '../../context/AuthProvider'
import { useState } from 'react'

const Navbar = () => {
    const { user, logout } = useContext(AuthContext)
    const handleLogout = () => {
        logout()
            .then(() => { })
            .catch(err => console.error(err))
    }
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.pageYOffset > 10) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    window.addEventListener('scroll', toggleVisibility);
    const navMenuItems = <>
        {!user && <li><Link to='/'>Home</Link></li>}
        <li><Link to='/blogs'>Blogs</Link></li>
        <li><a href='https://drive.google.com/file/d/1lV9dIwZU1Ede97Fao-GY1s3EjLPyjvO-/view?usp=share_link' target="_blank" rel="noreferrer">Resume</a></li>
        <li><Link to='/contact'>Contact</Link></li>
        {user && <li><Link to='/dashboard'>Manage</Link></li>}
    </>
    return (
        <div className={`${isVisible? 'bg-white shadow': 'bg-transparent'} fixed top-0 left-0 right-0 z-10`}>
            <div className="navbar max-w-[1250px] mx-auto justify-between">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-4 shadow bg-secondary rounded-box w-52">
                            {navMenuItems}
                            <SocialLinks />
                        </ul>
                    </div>
                    <Link to='/' className="normal-case lg:text-2xl md:text-2xl text-xl color-green font-bold">Shahtaz R.</Link>
                </div>
                <div className="navbar-end hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navMenuItems}
                    </ul>
                    <SocialLinks />
                    {user && <span onClick={handleLogout} className="text-warning cursor-pointer">Logout</span>}
                </div>
            </div>
        </div>
    )
}

export default Navbar