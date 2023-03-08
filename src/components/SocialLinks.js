import React from 'react'
import { GrFacebookOption, GrGithub, GrLinkedinOption } from 'react-icons/gr'
const SocialLinks = () => {
    return (
        <div className='flex gap-3 color-green mx-8'>
            <a target='_blank' rel="noreferrer" href='https://www.facebook.com/shahtaz.rahman.3/' className='border-[1px] p-[5px] rounded-full hover:bg-error transition duration-300'><GrFacebookOption /></a>
            <a target='_blank' rel="noreferrer" href='https://www.linkedin.com/in/shahtazrahman/' className='border-[1px] p-[5px] rounded-full hover:bg-error transition duration-300'><GrLinkedinOption /></a>
            <a target='_blank' rel="noreferrer" href='https://github.com/shahtaz-tqldd/' className='text-[28px] hover:text-error transition duration-300'><GrGithub /></a>
        </div>
    )
}

export default SocialLinks