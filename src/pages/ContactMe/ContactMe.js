import React from 'react'
import useTitle from '../../hooks/useTitle'
import ContactMeForm from './ContactForm/ContactMeForm'
import SideBar from './SideBar/SideBar'

const ContactMe = () => {
    useTitle('Contact')
    return (
        <section className='max-w-[1230px] mx-auto px-3 flex flex-col lg:flex-row gap-16 mt-8'>
            <div className='lg:w-[40%]'>
                <SideBar />
            </div>
            <div className='lg:w-[60%] bg-[#93C6E7] rounded-2xl'>
                <ContactMeForm />
            </div>
        </section>
    )
}

export default ContactMe