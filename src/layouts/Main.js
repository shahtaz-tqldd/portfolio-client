import React, { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import Loader from '../components/Loader/Loader'
import Navbar from '../components/Navbar/Navbar'
import Profile from '../pages/Homepage/Profile/Profile'
import MobileNav from '../components/Navbar/MobileNav'
import Footer from '../components/Footer/Footer'

const Main = () => {
  return (
    <div className="max-w-[1440px] mx-auto flex gap-10 lg:px-4 md:px-8 px-4">
      <Suspense fallback={<Loader />}>
        <div className='w-[380px] lg:block hidden'>
          <Profile />
        </div>
        <div className='lg:max-w-[1000px]'>
          <Outlet />
          <Footer/>
        </div>
        <div className='max-w-[60px] lg:block md:block hidden'>
          <Navbar />
        </div>
        <div className='lg:hidden md:hidden block fixed bottom-3 left-10 right-10'>
          <MobileNav />
        </div>
      </Suspense>
    </div>
  )
}

export default Main