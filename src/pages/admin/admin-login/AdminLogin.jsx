import Layout from '@/file-components/layout/Layout'
import { auth } from '@/firebase/FirebaseConfig';
import { Button } from '@material-tailwind/react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

const AdminLogin = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    //* Login Function
    const login = async (event) => {
        event.preventDefault(); // Add this to prevent form submission
        if (!email || !password) {
            return toast.error("Fill all required fields.");
        }
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            toast.success('Login Success');
            localStorage.setItem('admin', JSON.stringify(result));
            navigate('/dashboard');
        } catch (error) {
            toast.error('Login Failed');
            console.log(error);
        }
    }


    return (
        <Layout>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <div className="flex justify-center mb-6">
                        <img src="https://github.com/arunks2003/images/blob/main/icon.png?raw=true" alt="" style={{ height: "70px" }} />
                    </div>
                    <h2 className="mt-10 font-serif text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Sign in to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form action="#" method="POST" className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                    required
                                    autoComplete="email"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>
                                <div className="text-sm">
                                    <Link to='/forgot-password' className="font-semibold text-indigo-600 hover:text-indigo-500">
                                        Forgot password?
                                    </Link>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    type="password"
                                    required
                                    autoComplete="current-password"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <Button
                                type="button"
                                className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                onClick={login}
                            >
                                Login
                            </Button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Not a member?{' '}
                        <Link to='/register' className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                            Register
                        </Link>
                    </p>
                </div>
            </div>
        </Layout>
    )
}

export default AdminLogin
