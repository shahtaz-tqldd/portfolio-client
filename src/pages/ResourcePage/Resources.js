import React from 'react'
import SectionTitle from '../../components/Typography/SectionTitle'
import SectionHead from '../../components/Typography/SectionHead'

const Resources = () => {
    const props = { img: "https://cdn.lordicon.com/svbmmyue.json", text: "Resources" }
    return (
        <section>
            <SectionTitle props={props} />
            <div className='projects'>
            <div className='lg:mr-24'>
                <SectionHead>Design</SectionHead>
                <h2 className='text-xl mb-2'>Themeforrest</h2>
                <p>Drake - Personal Portfolio Wordpress theme</p>
                <a href='https://themeforest.net/item/drake-personal-portfolio-wordpress-theme/44528296' target='_blank' rel='noreferrer' className='text-primary text-sm mt-1'>Original Link</a>
            </div>

            <div className='lg:mr-24'>
                <SectionHead>Icons</SectionHead>
                <h2 className='text-xl mb-2'>Lordicons</h2>
                <h2 className='text-xl mb-2'>React Icons</h2>
            </div>

            <div className='lg:mr-24'>
                <SectionHead>Fonts</SectionHead>
                <h2 className='text-xl mb-2'>Google Fonts</h2>
                <p>Inter</p>
            </div>
            </div>
        </section>
    )
}

export default Resources