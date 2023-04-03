import React from 'react'
import profile from '../../../assets/images/shahtaz.jpg'

const HomeProfile = () => {
    return (
        <div className='w-full px-4 lg:hidden flex md:flex-row items-center flex-col py-6'>
            <div className='md:w-1/2 w-full flex md:flex-col flex-row justify-center items-center mb-6'>
                <div className='flex md:flex-col flex-row justify-between md:h-28 h-auto md:w-auto w-full'>
                    <h2 className='text-white text-4xl font-bold text-[#03C988]'>Shahtaz</h2>
                    <h2 className='text-white leading-[20px]'>Full-Stack<br />Web Developer</h2>
                </div>
            </div>
            <div className='md:w-1/2'>
                <img src={profile} alt="" className="h-[250px] w-[250px] object-cover rounded-3xl md:ml-auto mx-auto" />
            </div>
        </div>
    )
}

export default HomeProfile