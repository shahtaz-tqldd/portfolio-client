import React from 'react'
import useTitle from '../../hooks/useTitle'
import AboutMe from './components/AboutMe'
import ContactBanner from './components/ContactBanner'
import MySkills from './components/MySkills'
import Projects from './components/Projects'
import Services from './components/Services'
import TopBanner from './components/TopBanner'

const Homepage = () => {
  useTitle('Portfolio')
  return (
    <div className='max-w-[1230px] mx-auto lg:mt-20'>
      <TopBanner />
      <AboutMe />
      <Services />
      <MySkills />
      <Projects />

      <div className='lg:w-2/3 mx-auto mt-24'>
        <ContactBanner/>
      </div>
    </div>
  )
}

export default Homepage