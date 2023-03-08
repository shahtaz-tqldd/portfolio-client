import React from 'react'

const SkillCard = ({ sets, index }) => {
    const { skillSet, setsName } = sets;
    const colors = ['#8DCBE6', '#B6EADA', '#F3CCFF', '#DAE2B6'];
    return (
        <div className={`bg-white rounded-lg hover:shadow-lg`}
            data-aos="fade-up"
            data-aos-delay={`${((index) % 4) * 100 + 100}`}
        >
            <div
                className='py-3 px-5 rounded-t-lg'
                style={{ backgroundColor: colors[index % colors.length] }}
            >
                {setsName}
            </div>
            <div className='p-5'>
                <div className='grid grid-cols-3 gap-5'>
                    {
                        skillSet.map(skill => <div key={skill.id} className='flex flex-col items-center'>
                            <img src={skill.icon} alt="icon" className='h-9 w-9 object-contain' />
                            <h1 className='text-center mt-2 text-[14px]'>{skill.name}</h1>
                        </div>)
                    }
                </div>
            </div>
        </div >
    )
}

export default SkillCard