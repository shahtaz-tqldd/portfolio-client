import React, { useEffect, useState } from 'react'
import profile from '../../../assets/images/shahtaz.jpg'
import { MdFacebook } from 'react-icons/md'
import { IoLogoLinkedin, IoLogoGithub } from 'react-icons/io'
import TextTransition, { presets } from "react-text-transition";
import { Link } from 'react-router-dom';

const TopBanner = () => {
    const [index, setIndex] = useState(0);
    const texts = [
        "MERN Stack",
        "Frontend",
        "React JS"
    ];
    useEffect(() => {
        const intervalId = setInterval(() =>
            setIndex(index => index + 1),
            3000
        );
        return () => clearTimeout(intervalId);
    }, []);
    return (
        <div className="hero">
            <div className="w-full hero-content flex-col lg:flex-row-reverse justify-between">
                <figure className='lg:w-1/2 flex justify-center' data-aos="fade-left"><img src={profile} alt='banner' className="h-[450px] rounded-xl" /></figure>
                <div className='lg:w-1/2 flex items-center gap-10' data-aos="fade-right">
                    <div className='text-2xl flex gap-6 flex-col'>
                        <a target='_blank' rel="noreferrer" href='https://www.facebook.com/shahtaz.rahman.3/'><MdFacebook className='text-[#1778f2]' /></a>
                        <a target='_blank' rel="noreferrer" href='https://www.linkedin.com/in/shahtazrahman/'><IoLogoLinkedin className='text-[#0072b1]' /></a>
                        <a target='_blank' rel="noreferrer" href='https://github.com/shahtaz-tqldd/'><IoLogoGithub className='text-white' /></a>
                    </div>
                    <div>
                        <p className=" text-2xl mb-2">Hi! This is Shahtaz Rahman</p>
                        <h1 className="text-5xl font-bold flex">I am a&nbsp;
                            <TextTransition className="text-success" springConfig={presets.wobbly}>
                                {texts[index % texts.length]}
                            </TextTransition>
                        </h1>
                        <h1 className="text-5xl font-bold flex">web Developer</h1>
                        <a href='https://drive.google.com/file/d/1lV9dIwZU1Ede97Fao-GY1s3EjLPyjvO-/view?usp=share_link' target="_blank" rel="noreferrer">
                            <button className="btn btn-primary btn-sm mt-8 rounded normal-case text-white">Hire Me</button>
                        </a>
                        <Link to='/contact'><button className="btn btn-primary btn-sm mt-8 rounded normal-case btn-outline ml-4">Contact Me</button></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TopBanner