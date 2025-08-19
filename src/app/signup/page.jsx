'use client'

import React from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import Image from 'next/image'

function signup() {
    const router = useRouter()
    const [user, setUser] = useState({
        email: "",
        password: "",
        username: "",
    });
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user])

    const onSignup = async () => {
        try {
            setLoading(true);
            const response = await axios.post('/api/users/signup', user);
            console.log(response.data.message);
            const message = response.data.message;
            setTimeout(() => router.push('/login'), 2500)
            toast(message);
        } catch (error) {
            console.error("Error during signup:", error);
            toast.error(error.message)

        }
        finally {
            setLoading(false);
        }
    }

    return (

        <div className=" bg-[url('/background.png')] h-[100vh] w-[100%] bg-no-repeat lg:bg-center bg-cover 	bg-right-bottom" >
            <div className='w-[100%] lg:w-[50%] h-[100%] flex flex-col items-center justify-center m-0 p-0' >
                {/* logo section with heading */}
                <div className={`   flex  width-[100%]  flex-col items-center justify-center`}  >
                    < Image
                        className="mb-4"
                        src="/avator for login.png"
                        alt="Next.js logo"
                        width={180}
                        height={38}
                        priority
                    />
                    <h1 className={`font-[var(--font-lobster)] , cursive]  text-white  text-5xl  mb-6`} >{loading ? "processing" : "sign up"}</h1>
                </div>
                {/* username feild */}
                <div className='w-[100%] flex flex-col justify-center items-center' >
                    <div className="flex flex-col w-[50%]">
                        <label htmlFor='username' className='text-white text-1.5xl' >username</label>
                        <input
                            type='text'
                            value={user.username}
                            onChange={(e) => setUser({ ...user, username: e.target.value })}
                            className=' password-input pl-2 w-[100%]  border border-white border-b-2 border-l-0 border-t-0 border-r-0 mb-4 mt-0 outline-none focus:border-b-yellow-400 text-white bg-transparent'
                            // placeholder='Enter your email'
                            autoComplete="new-password"
                        />
                    </div>
                </div>
                {/* email feild */}
                <div className='w-[100%] flex flex-col justify-center items-center' >
                    <div className="flex flex-col w-[50%]">
                        <label htmlFor='email' className='text-white text-1.5xl' >email</label>
                        <input
                            type='text'
                            value={user.email}
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                            className=' password-input pl-2 w-[100%]  border border-white border-b-2 border-l-0 border-t-0 border-r-0  mt-0 mb-4  outline-none focus:border-b-yellow-400 text-white bg-transparent'
                            autoComplete="new-password"

                        // placeholder='Enter your email'
                        />
                    </div>
                </div>
                {/* password feild */}
                <div className='w-[100%] flex flex-col justify-center items-center' >
                    <div className="flex flex-col w-[50%]">
                        <label htmlFor='username' className='text-white text-1.5xl'>password</label>
                        <input
                            type='password'
                            value={user.password}
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                            className=' password-input pl-2 w-[100%]  border border-white border-b-2 border-l-0 border-t-0 border-r-0  mt-0 mb-4 outline-none focus:border-b-yellow-400 text-white bg-transparent'
                            autoComplete="new-password"

                        // placeholder='Enter your password'
                        />
                    </div>
                </div>
                {/* sign up btn */}
                <button
                    onClick={onSignup}
                    className={` w-[50%] bg-yellow-500 text-green-950 font-bold  p-2 border border-gray-300 rounded lg mb-2 focus:outline-none focus:border-gray-600    ${buttonDisabled ? 'disabled disabled:bg-black disabled:text-blue' : ''} `}
                >{buttonDisabled ? "to sign up fill all feilds" : "sign up"}</button>
                {/* already have an account login */}

                <div className='w-[50%] mb-2 flex flex-col  items-end'>
                    <Link href='/login' className='text-white hover:underline'>
                        Already have an account? Login
                    </Link>
                </div>

            </div>
        </div>
    )
}

export default signup
