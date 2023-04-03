import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { VscWorkspaceTrusted } from 'react-icons/vsc'
import { BiGridAlt, BiNews, BiOutline } from 'react-icons/bi'

const DashboardLayout = () => {
    const location = useLocation()
    const barLocal = location?.pathname?.split('/').slice(-1)[0]
    return (
        <div className='w-[900px] min-h-[80vh]'>
            <div className="flex gap-7 fixed top-0 text-xs bg-base-100 w-full pb-6 pt-16">
                <Link
                    to='/dashboard'
                    className={`flex items-center gap-2 border-[1px] border-accent py-2 px-4 rounded-full ${barLocal === 'dashboard' && 'tab-active text-primary border-primary'}`}>
                    <BiGridAlt />Dashboard
                </Link>

                <Link
                    to='/dashboard/blogs'
                    className={`flex items-center gap-2 border-[1px] border-accent py-2 px-4 rounded-full ${barLocal === 'blogs' && 'tab-active text-primary border-primary'}`}>
                    <BiNews />Blogs
                </Link>

                <Link
                    to='/dashboard/projects'
                    className={`flex items-center gap-2 border-[1px] border-accent py-2 px-4 rounded-full ${barLocal === 'projects' && 'tab-active text-primary border-primary'}`}>
                    <BiOutline />Projects
                </Link>

                <Link
                    to='/dashboard/skills'
                    className={`flex items-center gap-2 border-[1px] border-accent py-2 px-4 rounded-full ${barLocal === 'skills' && 'tab-active text-primary border-primary'}`}>
                    <VscWorkspaceTrusted />Skills
                </Link>
            </div>
            <div className='mt-36'>
            <Outlet />
            </div>
        </div>
    )
}

export default DashboardLayout