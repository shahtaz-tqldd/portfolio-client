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
        <section className='flex justify-center'>
            <div className='bg-neutral rounded-lg mt-6 md:mt-24 lg:mt-32 p-6 border-t-4 border-success'>
                <h2 className='text-2xl font-bold mb-5 w-[320px]'>Admin Login</h2>

                <form onSubmit={handleLogin}>
                    <span className='flex items-center mb-2'><MdEmail className='text-2xl mr-2' />
                        <input type="email" name="email" placeholder="Your Email" className="input input-bordered w-full rounded-full focus:outline-none focus:border-primary" />
                    </span>
                    <span className='flex items-center mb-3'><MdLock className='text-2xl mr-2' />
                        <input type="password" name="password" placeholder="Password" className="input input-bordered w-full rounded-full focus:outline-none focus:border-primary" />
                    </span>
                    <input type="submit" value="Login" className="btn btn-success w-full rounded-md mt-4 mb-3" />
                </form>
            </div>
        </section>
    )
}

export default Login