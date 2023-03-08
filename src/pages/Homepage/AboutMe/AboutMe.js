import React from 'react'
import about from '../../../assets/images/myphoto.png'
import bg from '../../../assets/images/bg-shape.png'

const AboutMe = () => {
  return (
    <section className='bg-[#CBEDD5]'>
      <div className='flex items-center justify-between max-w-[1230px] mx-auto px-3 py-28'>
        <div className='lg:w-1/2 flex justify-center items-center'>
          <div data-aos="fade-right" className='mt-8'>
            <img src={bg} alt="shahtaz" className="max-w-sm relative" />
            <img src={about} alt="shahtaz" className="max-w-sm scale-90 absolute bottom-[13px] overflow-hidden -translate-x-[12%]" />
          </div>
        </div>
        <div className='lg:w-1/2' data-aos="fade-left">
          <h1 className="text-xl font-bold">About Me</h1>
          <p className="py-6">I started web programming out of self interest and found out I enjoy designing and
            developing web application. It gives me the enlightenment of creating something that I can own. <br /><br />
            For more than 1 year I have been learning web development. I have excelled in frontend development technology
            and then backend as well. I have worked on 12 different projects of my own. <br /><br />
            I like to read books, go on tours and watch sci-fi movies.
          </p>
          <a href='https://drive.google.com/file/d/1JuY8s0GFlqmSvGZwZ4KWu67Jo5W6tQN4/view?usp=sharing' target="_blank" rel="noreferrer">
            <button className='btn btn-neutral rounded btn-wide text-white normal-case mt-4'>Get My CV</button>
          </a>
        </div>
      </div>
    </section>
  )
}

export default AboutMe