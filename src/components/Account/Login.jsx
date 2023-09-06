import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthProvider/AuthProvider';
import { FaSpinner } from 'react-icons/fa';

const Login = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [err, setErr] = useState('')
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const { user,
        load,
        signIn,
        signUp,
        updt,
        out, } = useContext(AuthContext)

    const handleSignup = () => {
        setLoading(true)
        setErr('')
        if (!email || !password ) {
            setLoading(false)
            setErr('Please fill all the fields')
            return
        }
        signIn(email, password)
            .then(res => {
                setLoading(false)
                setName('')
                setEmail('')
                setPassword('')
                navigate('/')
            })
            .catch(err => {
                setLoading(false)
                setErr(err.message)
            })

    }
    return (
        <div>
            <div className="flex flex-col max-w-md p-6 border mx-auto bg-blue-100 mt-7 rounded-md sm:p-10 dark:bg-gray-900 dark:text-gray-100">
                <div className="mb-8 text-center">
                    <h1 className="my-3 text-4xl font-bold">Sign in</h1>
                    <p className="text-sm dark:text-gray-400">Sign in to access your account</p>
                </div>
                <p className='my-4 text-red-500'>{err}</p>
                <div  action="" className="space-y-12">
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm">Email address</label>
                            <input value={email} onChange={e=>setEmail(e.target.value)} type="email" name="email" id="email" placeholder="leroy@jenkins.com" className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100" />
                        </div>
                        <div>
                            <div className="flex justify-between mb-2">
                                <label htmlFor="password" className="text-sm">Password</label>
                            </div>
                            <input value={password} onChange={e=>setPassword(e.target.value)}  type="password" name="password" id="password" placeholder="*****" className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div>
                            <button onClick={handleSignup} disabled={loading} type="button" className="w-full px-8 py-3  bg-blue-400 font-semibold rounded-md dark:bg-violet-400 flex justify-center items-center gap-3 dark:text-gray-900">{loading && <FaSpinner className='animate-spin'/>} Sign in</button>
                        </div>
                        <p className="px-6 text-sm text-center dark:text-gray-400">Don't have an account yet?
                            <Link to='/signup' rel="noopener noreferrer"  className="hover:underline dark:text-violet-400"> Sign up</Link>.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;