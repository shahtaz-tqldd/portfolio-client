import React from 'react'
import profile from '../../../assets/images/shahtaz.jpg'
import SocialLinks from '../../../components/SocialLinks'

const Profile = () => {

    return (
        <div className='lg:w-[380px] border-[1px] border-[#bbb] rounded-3xl px-6 py-10 sticky top-16'>
            <div className='flex justify-between mb-6'>
                <h2 className='text-white text-4xl font-bold text-[#03C988]'>Shahtaz</h2>
                <h2 className='text-white leading-[20px]'>Full-Stack<br />Web Developer</h2>
            </div>
            <img src={profile} alt="" className="h-[250px] w-[250px] object-cover rounded-3xl mx-auto" />
            <div className='flex flex-col items-center'>
                <h2 className='text-white text-lg text-white mt-8'>shahtazrahman17@gmail.com</h2>
                <h2 className='text-white text-lg text-white mt-2 mb-6'>Dhaka, Bangladesh</h2>

                {/* SOCIAL MEDIA ICONS */}
                <SocialLinks />
                <a href='#contact'>
                    <button className='btn btn-wide btn-primary mt-8'>Hire Me</button>
                </a>
            </div>
        </div>
    )
}

export default Profile