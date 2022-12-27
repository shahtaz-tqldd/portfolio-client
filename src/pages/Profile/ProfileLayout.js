import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { VscWorkspaceTrusted } from 'react-icons/vsc'
import { BiGridAlt, BiNews, BiOutline } from 'react-icons/bi'
const ProfileLayout = () => {
    const location = useLocation()
    const barLocal = location?.pathname?.split('/').slice(-1)[0]
    return (
        <div className='flex gap-10'>
            <div className="flex flex-col gap-3 text-[16px] bg-neutral p-6 rounded-lg shadow-lg h-48 sticky top-20">
                <Link
                    to='/dashboard'
                    className={`flex items-center gap-2 ${barLocal === 'dashboard' && 'tab-active text-success'}`}>
                    <BiGridAlt />Dashboard
                </Link>

                <Link
                    to='/dashboard/blogs'
                    className={`flex items-center gap-2 ${barLocal === 'blogs' && 'tab-active text-success'}`}>
                    <BiNews />Blogs
                </Link>

                <Link
                    to='/dashboard/projects'
                    className={`flex items-center gap-2 ${barLocal === 'projects' && 'tab-active text-success'}`}>
                    <BiOutline />Projects
                </Link>

                <Link
                    to='/dashboard/skills'
                    className={`flex items-center gap-2 ${barLocal === 'skills' && 'tab-active text-success'}`}>
                    <VscWorkspaceTrusted />Skills
                </Link>
            </div>
            <Outlet />
        </div>
    )
}

export default ProfileLayout