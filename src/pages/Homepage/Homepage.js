import React from 'react'
import AboutMe from './components/AboutMe'
import MySkills from './components/MySkills'
import Projects from './components/Projects'
import Services from './components/Services'
import TopBanner from './components/TopBanner'

const Homepage = () => {
  return (
    <div className='max-w-[1230px] mx-auto mt-24'>
      <TopBanner />
      <AboutMe />
      <Services />
      <MySkills />
      <Projects />
    </div>
  )
}

export default Homepage