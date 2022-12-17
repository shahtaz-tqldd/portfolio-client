import { useQuery } from '@tanstack/react-query'
import React from 'react'
import skillImg from '../../../assets/images/skills.gif'
import Loading from '../../../components/Loading'
import SkillCard from './SkillCard'

const MySkills = () => {
    const { data: skills = [], isLoading} = useQuery({
        queryKey: ['skills'],
        queryFn: async() => {
            const res = await fetch('https://portfolio-backend-sepia-seven.vercel.app/skills')
            const data = await res.json()
            return data                
        }
    })

    if (isLoading) {
        return <Loading/>
    }
    
    return (
        <div className='flex lg:flex-row flex-col gap-8 my-32'>
            <div className='lg:w-1/3' data-aos="fade-right">
                <img src={skillImg} className='w-2/3 lg:block hidden' alt="skills" />
                <h1 className='lg:text-5xl md:text-4xl text-3xl font-bold mt-12 lg:text-left text-center'>My Web Development Skills</h1>
            </div>
            <div className='lg:w-2/3 grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-6'>
                {
                    skills.map((sets, index) => <SkillCard key={index} sets={sets} />)
                }
            </div>
        </div>
    )
}

export default MySkills