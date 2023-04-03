import React, { useContext } from 'react'
import { toast } from 'react-hot-toast'
import { MdLock, MdEmail } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthProvider'
import useTitle from '../../hooks/useTitle'

const Login = () => {
    useTitle('Login')
    const { login } = useContext(AuthContext)
    const navigate = useNavigate()
    const handleLogin = (e) => {
        e.preventDefault()
        const email = e.target.email.value
        const password = e.target.password.value
        login(email, password)
            .then(result => {
                if (result.user) {
                    toast.success("Login Successful!")
                    navigate('/dashboard')
                }
            })
            .catch(err => console.error(err))

    }
    return (
        <section className='w-full h-[100vh] flex justify-center items-center'>
            <div className='bg-[#2C3333] max-w-[450px] h-[370px] rounded-lg p-10 border-t-4 border-primary glown'>
                <h2 className='text-3xl mb-8'>Admin Login</h2>
                <form onSubmit={handleLogin}>
                    <span className='flex items-center mb-2'><MdEmail className='text-2xl mr-2' />
                        <input type="email" name="email" placeholder="Email" className="input input-bordered w-full rounded-full focus:outline-none focus:border-primary" />
                    </span>
                    <span className='flex items-center mb-3'><MdLock className='text-2xl mr-2' />
                        <input type="password" name="password" placeholder="Password" className="input input-bordered w-full rounded-full focus:outline-none focus:border-primary" />
                    </span>
                    <input type="submit" value="Login" className="btn btn-primary w-full rounded-md mt-10" />
                </form>
            </div>
        </section>
    )
}

export default Login