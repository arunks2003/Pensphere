import Layout from '@/file-components/layout/Layout'
import { Button } from '@material-tailwind/react';
import React, { useState } from 'react'
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import toast from 'react-hot-toast';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');

    // console.log(email, newPassword)
    const handleSubmit = async (e) => {
        e.preventDefault();
        const auth = getAuth();

        try {
            return sendPasswordResetEmail(auth, email).then((a) => {
                toast.success("Check email")
            })
        } catch (error) {
            console.error("Error sending password reset email:", error);
            toast.error("Error!!")
        }
    };
    return (
        <div>
            <Layout>
                <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                    <div className="flex justify-center mb-6">
                        <img src="https://github.com/arunks2003/images/blob/main/icon.png?raw=true" alt="" style={{ height: "70px" }} />
                    </div>
                    <h2 className="mt-5 font-serif text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Change Password
                    </h2>
                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form className="space-y-6" action="#" method="POST">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address:</label>
                                <div className="mt-2">
                                    <input onChange={(e) => { setEmail(e.target.value) }} value={email} id="email" name="email" type="email" autoComplete="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </div>
                            </div>
                            <div>
                                <Button
                                    type="button"
                                    className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    onClick={(e) => handleSubmit(e)}
                                >
                                    Submit
                                </Button></div>
                        </form>
                    </div>
                </div>

            </Layout>
        </div>
    )
}

export default ForgotPassword
