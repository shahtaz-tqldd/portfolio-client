import React from 'react'
import useTitle from '../../hooks/useTitle'

const Dashboard = () => {
    useTitle('Dashboard')
    
    return (
        <div>
            <h1 className='text-4xl font-bold uppercase'>Dashboard</h1>
        </div>
    )
}

export default Dashboard