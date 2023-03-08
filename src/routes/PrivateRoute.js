import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import Loader from '../components/Loader/Loader'
import { AuthContext } from '../context/AuthProvider'

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext)
    if (loading) {
        <Loader />
    }
    if (user) {
        return children
    }
    return <Navigate to='/' />
}

export default PrivateRoute