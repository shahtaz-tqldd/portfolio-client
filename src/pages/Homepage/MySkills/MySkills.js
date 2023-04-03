import { useQuery } from '@tanstack/react-query'
import React from 'react'
import SkillCard from '../../../components/Cards/SkillCard'
import SectionTitle from '../../../components/Typography/SectionTitle'
import SectionHead from '../../../components/Typography/SectionHead'

const MySkills = () => {
    const { data: skills = [] } = useQuery({
        queryKey: ['skills'],
        queryFn: async () => {
            const res = await fetch('https://portfolio-backend-sepia-seven.vercel.app/skills')
            const data = await res.json()
            return data
        }
    })

    const props = { img: "https://cdn.lordicon.com/svbmmyue.json", text: "My Skills" }

    return (
        <section id="skills" className='mb-32'>
            <SectionTitle props={props} />
            <SectionHead>
                My <span className='text-primary'>Advantages</span>
            </SectionHead>
            <div className='grid grid-cols-1 gap-20'>
                {
                    skills.map((sets, index) => <SkillCard key={index} index={index} sets={sets} />)
                }
            </div>
        </section>
    )
}

export default MySkills