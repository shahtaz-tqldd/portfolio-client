import { useQuery } from '@tanstack/react-query'
import React from 'react'
import SkillCard from '../../../components/Cards/SkillCard'
import SectionHeading from '../../../components/Typography/SectionHeading'

const MySkills = () => {
    const { data: skills = []} = useQuery({
        queryKey: ['skills'],
        queryFn: async() => {
            const res = await fetch('https://portfolio-backend-sepia-seven.vercel.app/skills')
            const data = await res.json()
            return data                
        }
    })
    
    return (
        <section>
            <SectionHeading>My Skills</SectionHeading>
            <div className='grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6'>
                {
                    skills.map((sets, index) => <SkillCard key={index} index={index} sets={sets} />)
                }
            </div>
        </section>
    )
}

export default MySkills