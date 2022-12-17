import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import Loading from '../components/Loading'
import { AuthContext } from '../context/AuthProvider'

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext)
    if (loading) {
        <Loading />
    }
    if (user) {
        return children
    } 
    return <Navigate to='/' />
}

export default PrivateRoute