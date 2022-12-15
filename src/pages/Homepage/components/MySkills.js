import React from 'react'
import skills from '../../../assets/images/skills.gif'

const MySkills = () => {
    const frontSkills = [
        {
            "id": 1,
            "name": "HTML",
            "icon": "https://cdn-icons-png.flaticon.com/512/732/732212.png"
        },
        {
            "id": 2,
            "name": "CSS",
            "icon": "https://cdn4.iconfinder.com/data/icons/social-media-logos-6/512/121-css3-512.png"
        },
        {
            "id": 3,
            "name": "JavaScript",
            "icon": "https://cdn-icons-png.flaticon.com/512/5968/5968292.png"
        },
        {
            "id": 4,
            "name": "Bootstrap",
            "icon": "https://camo.githubusercontent.com/2512b49c89512f2ff3718f7257f48ed5c46a4e331abbd890b6c5e8c0e458434f/68747470733a2f2f676574626f6f7473747261702e636f6d2f646f63732f352e322f6173736574732f6272616e642f626f6f7473747261702d6c6f676f2d736861646f772e706e67"
        },
        {
            "id": 5,
            "name": "Tailwind CSS",
            "icon": "https://static-00.iconduck.com/assets.00/file-type-tailwind-icon-512x307-l0anq79h.png"
        },
        {
            "id": 6,
            "name": "React JS",
            "icon": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png"
        },
    ]
    const backSkills = [
        {
            "id": 1,
            "name": "Node JS",
            "icon": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/2560px-Node.js_logo.svg.png"
        },
        {
            "id": 2,
            "name": "Express",
            "icon": "https://user-images.githubusercontent.com/25181517/183859966-a3462d8d-1bc7-4880-b353-e2cbed900ed6.png"
        },
        {
            "id": 3,
            "name": "Firebase",
            "icon": "https://cdn4.iconfinder.com/data/icons/google-i-o-2016/512/google_firebase-2-512.png"
        },
        {
            "id": 4,
            "name": "JWT Authentication",
            "icon": "https://media-exp1.licdn.com/dms/image/D4D12AQHW9aRSWIOMxQ/article-cover_image-shrink_600_2000/0/1657421703592?e=2147483647&v=beta&t=nKygyfSDFwgPdEoC-nEkogMS0527SBa8z8D_FqUr-us"
        },
    ]
    const dataSkills = [
        {
            "id": 1,
            "name": "Mongo DB",
            "icon": "https://cdn.iconscout.com/icon/free/png-256/mongodb-3629020-3030245.png"
        },

    ]
    const toolsSkills = [
        {
            "id": 1,
            "name": "GitHub",
            "icon": "https://cdn-icons-png.flaticon.com/512/25/25231.png"
        },
        {
            "id": 2,
            "name": "Figma",
            "icon": "https://cdn-icons-png.flaticon.com/512/5968/5968705.png"
        },
        {
            "id": 3,
            "name": "Netlify",
            "icon": "https://cdn.iconscout.com/icon/free/png-256/netlify-3628945-3030170.png"
        },
        {
            "id": 4,
            "name": "Vercel",
            "icon": "https://www.svgrepo.com/show/327408/logo-vercel.svg"
        },
        {
            "id": 5,
            "name": "Illustrator",
            "icon": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Illustrator_CC_icon.png/492px-Illustrator_CC_icon.png"
        },

    ]
    return (
        <div className='flex gap-8 my-32'>
            <div className='lg:w-1/3' data-aos="fade-right">
                <img src={skills} className='w-2/3' alt="skills" />
                <h1 className='text-5xl font-bold mt-12'>My Web Development Skills</h1>
            </div>
            <div className='lg:w-2/3 grid grid-cols-2 gap-6'>
                {/* frontend */}
                <div className='bg-neutral rounded-lg p-4' data-aos="fade-down">
                    <span className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-6 py-1 rounded text-white ml-3'>Frontend</span>
                    <div className='grid lg:grid-cols-3 gap-6 grid-cols-4 mt-6 mb-12'>
                        {
                            frontSkills.map(skill => <div key={skill.id} className='flex flex-col items-center'>
                                <img src={skill.icon} alt="icon" className='h-12 w-12 object-contain' />
                                <h1 className='text-center'>{skill.name}</h1>
                            </div>)
                        }
                    </div>
                </div>
                <div className='bg-neutral rounded-lg p-4' data-aos="fade-left">
                    <span className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-6 py-1 rounded text-white ml-3'>Backend</span>
                    <div className='grid lg:grid-cols-3 gap-6 grid-cols-4 mt-6 mb-12'>
                        {
                            backSkills.map(skill => <div key={skill.id} className='flex flex-col items-center'>
                                <img src={skill.icon} alt="icon" className='h-12' />
                                <h1 className='text-center'>{skill.name}</h1>
                            </div>)
                        }
                    </div>
                </div>
                <div className='bg-neutral rounded-lg p-4' data-aos="fade-up">
                    <span className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-6 py-1 rounded text-white ml-3'>Tools</span>
                    <div className='grid lg:grid-cols-3 gap-6 grid-cols-4 mt-6 mb-12'>
                        {
                            toolsSkills.map(skill => <div key={skill.id} className='flex flex-col items-center'>
                                <img src={skill.icon} alt="icon" className='h-12' />
                                <h1>{skill.name}</h1>
                            </div>)
                        }
                    </div>
                </div>
                <div className='bg-neutral rounded-lg p-4' data-aos="fade-right">
                    <span className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-6 py-1 rounded text-white ml-3'>Database</span>
                    <div className='grid lg:grid-cols-3 gap-6 grid-cols-4 mt-6 mb-12'>
                        {
                            dataSkills.map(skill => <div key={skill.id} className='flex flex-col items-center'>
                                <img src={skill.icon} alt="icon" className='h-12' />
                                <h1>{skill.name}</h1>
                            </div>)
                        }
                    </div>
                </div>

            </div>
        </div>
    )
}

export default MySkills