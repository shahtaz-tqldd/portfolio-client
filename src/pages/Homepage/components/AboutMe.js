import React from 'react'
import about from '../../../assets/images/myphoto.png'
import bg from '../../../assets/images/bg-shape.png'

const AboutMe = () => {
  return (
    <div id='about' className="hero mt-20">
      <div className="hero-content flex-col lg:flex-row w-full justify-between">
        <div data-aos="fade-right" className='mt-8'>
          <img src={bg} alt="shahtaz" className="max-w-sm relative" />
          <img src={about} alt="shahtaz" className="max-w-sm scale-90 absolute bottom-[13px] overflow-hidden -translate-x-[12%]" />
        </div>
        <div className='lg:w-1/2' data-aos="fade-left">
          <h1 className="text-xl font-bold">About Me</h1>
          <p className="py-6">I started web programming out of self interest and found out I enjoy designing and
            developing web application. It gives me the enlightenment of creating something that I can own. <br /><br />
            For more than 1 year I have been learning web development. I have excelled in frontend development technology
            and then backend as well. I have worked on 12 different projects of my own. <br /><br />
            I like to read books, go on tours and watch sci-fi movies.
          </p>
          <a href='https://drive.google.com/file/d/1lV9dIwZU1Ede97Fao-GY1s3EjLPyjvO-/view?usp=share_link' target="_blank" rel="noreferrer">
            <button className='btn btn-primary btn-sm rounded-sm text-white normal-case'>Resume</button>
          </a>
        </div>
      </div>
    </div>
  )
}

export default AboutMe