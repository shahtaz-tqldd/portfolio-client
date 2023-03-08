import React from 'react'
import ContactMeForm from '../../ContactMe/ContactForm/ContactMeForm'
import webDeveloper from '../../../assets/images/web-developer.png'
import SectionHeading from '../../../components/Typography/SectionHeading'

const ContactMe = () => {
    return (
        <section className='mt-28'>
            <SectionHeading>Contact Me</SectionHeading>
            <div className='flex items-center gap-12 bg-[#7286D3] p-10'>
                <div className='lg:w-[40%] p-5'>
                    <img src={webDeveloper} alt="" className='' />
                    <div className='font-bold text-white mt-6'>
                        <span className='lg:text-2xl md:text-3xl text-lg font-normal'>
                            Are you looking for a
                        </span><br />
                        <h1 className='lg:text-5xl md:text-5xl text-2xl mt-2'>
                            Web Developer?
                        </h1>
                    </div>
                </div>
                <div className='lg:w-[60%]'>
                    <ContactMeForm />
                </div>
            </div>
        </section>
    )
}

export default ContactMe