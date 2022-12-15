import React from 'react'
import { IoLogoLinkedin, IoLogoGithub } from 'react-icons/io'
import { MdLocalPhone, MdLocalPostOffice, MdLocationOn, MdFacebook } from 'react-icons/md'
import img from '../../../assets/images/image.png'
const SideBar = () => {
    return (
        <div data-aos="fade-right" className='bg-neutral rounded-lg p-6 flex flex-col items-center'>
            <img src={img} alt="shahtaz rahman" className='scale-125' />
            <h2 className='text-4xl font-bold text-white mb-3'>Shahtaz Rahman</h2>
            <div>
                <p className='flex items-center gap-1 my-1 text-success justify-center'><MdLocationOn />Dhaka, Bangladesh</p>
                <p className='flex items-center gap-1 my-1 text-success justify-center'><MdLocalPhone />+8801521305382</p>
                <p className='flex items-center gap-1 my-1 text-success justify-center'><MdLocalPostOffice />shahtazrahman17@gmail.com</p>
            </div>
            <div className='text-2xl flex gap-6 mt-5 text-white'>
                <a target='_blank' rel="noreferrer" href='https://www.facebook.com/shahtaz.rahman.3/'><MdFacebook className='hover:text-primary transition duration-300' /></a>
                <a target='_blank' rel="noreferrer" href='https://www.linkedin.com/in/shahtazrahman/'><IoLogoLinkedin className='text-[26px] hover:text-primary transition duration-300' /></a>
                <a target='_blank' rel="noreferrer" href='https://github.com/shahtaz-tqldd/'><IoLogoGithub className='hover:text-primary transition duration-300'/></a>
            </div>
        </div>
    )
}

export default SideBar