import React from 'react'
import { MdFacebook } from 'react-icons/md'
import { IoLogoLinkedin, IoLogoGithub } from 'react-icons/io'
const SocialLinks2 = () => {
    return (
        <>
            <a target='_blank' rel="noreferrer" href='https://www.facebook.com/shahtaz.rahman.3/'><MdFacebook className='text-[#1778f2] hover:scale-125 transition duration-300' /></a>
            <a target='_blank' rel="noreferrer" href='https://www.linkedin.com/in/shahtazrahman/'><IoLogoLinkedin className='text-[#0072b1] text-[26px] hover:scale-125 transition duration-300' /></a>
            <a target='_blank' rel="noreferrer" href='https://github.com/shahtaz-tqldd/'><IoLogoGithub className=' hover:scale-125 transition duration-300'/></a>
        </>
    )
}

export default SocialLinks2