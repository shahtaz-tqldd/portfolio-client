import React from 'react'

import useTitle from '../../hooks/useTitle'

const Profile = () => {
    useTitle('Dashboard')
    
    return (
        <div>
            <h1 className='text-4xl font-bold uppercase'>Dashboard</h1>
        </div>
    )
}

export default Profile