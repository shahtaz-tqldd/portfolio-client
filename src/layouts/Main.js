import React, { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer/Footer'
import Loader from '../components/Loader/Loader'
import Navbar from '../components/Navbar/Navbar'

const Main = () => {
  return (
    <>
      <Navbar />
      <main>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </>
  )
}

export default Main