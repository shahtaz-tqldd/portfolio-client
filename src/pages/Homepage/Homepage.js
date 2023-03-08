import React from 'react'
import useTitle from '../../hooks/useTitle'
import AboutMe from './AboutMe/AboutMe'
import MySkills from './MySkills/MySkills'
import Projects from './Projects/Projects'
import Services from './Services/Services'
import TopBanner from './TopBanner/TopBanner'
import ContactMe from './ContactMe/ContactMe'

const Homepage = () => {
  useTitle('Portfolio')
  return (
    <>
      <div className='max-w-[1230px] mx-auto px-3'>
        <TopBanner />
      </div>
      <AboutMe />
      <div className='max-w-[1230px] mx-auto px-3'>
        <Services />
        <MySkills />
        <Projects />
        <ContactMe />
      </div>
    </>
  )
}

export default Homepage