import React from 'react'

const SectionTitle = ({ props }) => {
    const { img, text } = props
    return (
        <div className='flex lg:pt-16 md:pt-16 pt-6 mb-16'>
            <div className="border-[1px] border-accent py-2 lg:px-5 px-4 lg:text-sm md:text-sm text-xs flex items-center gap-2 rounded-full">
                <lord-icon
                    target="div"
                    src={img}
                    trigger="hover"
                    colors="primary:#fff"
                    style={{ width: "18px", height: "18px" }}>
                </lord-icon>
                {text}
            </div>
        </div>
    )
}

export default SectionTitle