import React from 'react'
import SectionTitle from '../../../components/Typography/SectionTitle'
import { SiReact } from 'react-icons/si'
import { HiOutlineCode } from 'react-icons/hi'
import { FiCodesandbox } from 'react-icons/fi'
import SectionHead from '../../../components/Typography/SectionHead'

const Services = () => {
    const services = [
        {
            "id": 1,
            "service": "Frontend Web Development",
            "details": "I can convert any psd or Figma file into mobile or tab responsive web application. Capable of doing project in clean code."
        },
        {
            "id": 2,
            "service": "React JS Development",
            "details": "I have worked on 8 different React JS projcts. Also have a little working experience with Next JS."
        },
        {
            "id": 3,
            "service": "Full Stack Development",
            "details": "With the Frontend I am skilled in Node JS, Express, JWT and Firebase. Proficient in implementing Mongo DB."
        },
    ]
    const props = { img: "https://cdn.lordicon.com/ofwpzftr.json", text: "Services" }
    return (
        <section id="services" className='mb-32'>
            <SectionTitle props={props} />
            <SectionHead>
                My <span className='text-primary'>Specializations</span>
            </SectionHead>
            <div className='services'>
                {
                    services.map(({ service, details }, index) => <div key={index}
                        className='hover:text-primary hover:border-primary border-[1px] border-accent p-6 rounded-2xl'
                        data-aos="fade-up"
                        data-aos-delay={`${((index) % 6) * 100 + 100}`}
                    >
                        {index === 0 && <HiOutlineCode className='text-[40px]' />}
                        {index === 1 && <SiReact className='text-[40px]' />}
                        {index === 2 && <FiCodesandbox className='text-[40px]' />}
                        <div>
                            <h2 className='lg:text-2xl md:text-2xl text-xl mt-3 lg:font-normal md:font-normal font-bold'>{service}</h2>
                            <p className='text-accent mt-3 text-sm'>{details}</p>
                        </div>
                    </div>
                    )
                }
            </div>
        </section>
    )
}

export default Services