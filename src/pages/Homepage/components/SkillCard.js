import React from 'react'

const SkillCard = ({ sets }) => {
    const {skillSet, setsName} = sets
    return (
        <div className='bg-neutral rounded-lg p-4 shadow-lg' data-aos="fade-up">
            <span className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-6 py-1 rounded text-white ml-3'>{setsName}</span>
            <div className='grid grid-cols-3 gap-6 mb-8 mt-10'>
                {
                    skillSet.map(skill => <div key={skill.id} className='flex flex-col items-center'>
                        <img src={skill.icon} alt="icon" className='h-12 w-12 object-contain' />
                        <h1 className='text-center mt-2 text-[15px]'>{skill.name}</h1>
                    </div>)
                }
            </div>
        </div>
    )
}

export default SkillCard