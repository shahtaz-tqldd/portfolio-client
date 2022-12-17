import React, { useContext } from 'react'
import { toast } from 'react-hot-toast'
import { FcGoogle } from 'react-icons/fc'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthProvider'

const GoogleLogin = () => {
    const { googleLogin } = useContext(AuthContext)
    const navigate = useNavigate()
    const handleGoogleLogin = () => {
        googleLogin()
            .then(result => {
                console.log(result)
                toast.success("Successfully Login")
                navigate('/profile')
            })
            .catch(err => console.error(err))
    }
    return (
        <button onClick={handleGoogleLogin} className='btn btn-outline btn-primary w-full normal-case rounded-md mt-3 mb-4'>
            <FcGoogle className='text-xl' /> &nbsp;
            Continue with Google
        </button>
    )
}

export default GoogleLogin