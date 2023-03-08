import { useQuery } from '@tanstack/react-query'
import React from 'react'
import useTitle from '../../../hooks/useTitle'

const SkillDashboard = () => {
    useTitle('Skills Dashboard')
    const { data: skills = [] } = useQuery({
        queryKey: ['skills'],
        queryFn: async () => {
            const res = await fetch('https://portfolio-backend-sepia-seven.vercel.app/skills')
            const data = await res.json()
            return data
        }
    })
    return (
        <div className='w-full'>
            <h1 className='text-4xl font-bold uppercase'>My Skills</h1>
            <div className='flex flex-col gap-6 mt-10'>
                {
                    skills.map((sets, index) => <div key={index}>
                        <span className='text-success font-bold text-2xl'>{sets.setsName}</span>
                        <hr className='w-full mt-1'/>
                        <div className='flex flex-wrap gap-10 mb-8 mt-10'>
                            {
                                sets.skillSet.map(skill => <div key={skill.id} className='flex flex-col items-center'>
                                    <img src={skill.icon} alt="icon" className='h-12 w-12 object-contain' />
                                    <h1 className='text-center mt-2 text-[15px]'>{skill.name}</h1>
                                </div>)
                            }
                        </div>
                    </div>)
                }

            </div>
        </div>
    )
}

export default SkillDashboard