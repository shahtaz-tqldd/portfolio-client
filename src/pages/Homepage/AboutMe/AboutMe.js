import React from 'react'
import SectionTitle from '../../../components/Typography/SectionTitle'
import SectionHead from '../../../components/Typography/SectionHead'

const AboutMe = () => {
  const props = { img: "https://cdn.lordicon.com/bhfjfgqz.json", text: "About Me" }
  return (
    <section id='about' className='mb-16'>
      <SectionTitle props={props} />
      <SectionHead>
        Every great design start with even a <span className='text-primary'>better story</span>
      </SectionHead>

      <p className="text-accent max-w-[800px]">I started web programming out of self interest and found out I enjoy designing and
        developing web application. It gives me the enlightenment of creating something that I can own.
        For more than 1 year I have been learning web development. I have excelled in frontend development technology
        and then backend as well. I have worked on 12 different projects of my own.
        I like to read books, go on tours and watch sci-fi movies.
      </p>
      <div className='flex'>
        <a href='https://drive.google.com/file/d/1JuY8s0GFlqmSvGZwZ4KWu67Jo5W6tQN4/view?usp=sharing' target="_blank" rel="noreferrer">
          <button className='hover:text-primary transition duration-300 text-lg flex gap-2 items-center uppercase icon mt-10'>
            <lord-icon
              target="button"
              src="https://cdn.lordicon.com/egiwmiit.json"
              trigger="hover"
              class="current-color"
              style={{ width: "24px", height: "24px" }}>
            </lord-icon>
            Get my CV
          </button>
        </a>
      </div>
    </section>
  )
}

export default AboutMe