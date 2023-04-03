import React from 'react'
import SectionTitle from '../../../components/Typography/SectionTitle';

const TopBanner = () => {
    const props = { img: "https://cdn.lordicon.com/osuxyevn.json", text: "Introduction" }
    return (
        <section id="home" className='mb-32'>
            <SectionTitle props={props} />
            <h1 className='lg:text-[65px] lg:leading-[75px] md:text-[50px] md:leading-[60px] text-[28px] leading-[40px]'>
                Hey! I'm <span className='text-primary'>Shahtaz</span>,<br /> Full-Stack Web Developer</h1>
            <p className='mt-6 lg:text-2xl md:text-2xl text-md'>
                I am a MERN Stack developer who loves to create dynamic and responsive web applications.
            </p>
            <div className='flex lg:flex-row md:flex-row flex-col justify-between lg:items-end md:items-end items-center'>
                <div className='flex lg:gap-28 md:gap-24 gap-20 lg:mt-20 md:mt-20 mt-12'>
                    <div>
                        <span className='text-primary lg:text-[70px] md:text-[60px] text-[50px] leading-[100px]'>2+</span>
                        <p className='uppercase text-accent -mt-2'>Years of<br /> experience</p>
                    </div>
                    <div>
                        <span className='text-primary lg:text-[70px] md:text-[60px] text-[50px] leading-[100px]'>20+</span>
                        <p className='uppercase text-accent -mt-2'>Projects<br /> Completed</p>
                    </div>
                </div>
                <a href="#projects" className='flex hover:text-primary items-center gap-2 text-2xl icon cursor-pointer lg:mt-0 md:mt-0 mt-14'>
                    My Projcets
                    <lord-icon
                        target="div"
                        src="https://cdn.lordicon.com/rxufjlal.json"
                        trigger="hover"
                        class="current-color"
                        style={{ width: "40px", height: "40px" }}>
                    </lord-icon>
                </a>
            </div>
        </section >
    )
}

export default TopBanner