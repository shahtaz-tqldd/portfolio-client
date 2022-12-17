import React from 'react'
import useTitle from '../../hooks/useTitle'
import ContactMeForm from './components/ContactMeForm'
import SideBar from './components/SideBar'

const ContactMe = () => {
    useTitle('Contact')
    return (
        <div className='flex flex-col lg:flex-row gap-8 mt-12'>
            <div className='lg:w-1/3'>
                <SideBar />
            </div>
            <div className='lg:w-2/3'>
                <ContactMeForm />
            </div>
        </div>
    )
}

export default ContactMe