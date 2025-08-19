'use client'
import Image from 'next/image'
import React from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'


function login() {
    const [user, setUser] = useState({
        email: "",
        password: "",
    });
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(false);
    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        }
        else {
            setButtonDisabled(true);
        }
    }, [user]);

    const onlogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post('/api/users/login', user);
            console.log('response from login', response);
            toast.success('Login successful');
            router.push('/profile');
        } catch (error) {
            console.log('error in login', error);
            toast.error('Login failed. Please try again.');
        }
        finally {
            setLoading(false);
        }
    }
    // const sendEmail = async () => {
    //     try {
    //               await sendEmail({email , emailType:"VERIFY" , userId:savedUser._id })

    //     } catch (error) {
    //         console.log('error in sending email', error);
    //         toast.error('Failed to send email. Please try again.');

    //     }
    // }

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
                    <h1 className={`font-[var(--font-lobster)] , cursive]  text-white  text-5xl  mb-6`} >WELCOME</h1>
                </div>
                {/* emial feild */}
                <div className='w-[100%] flex flex-col justify-center items-center' >
                    <div className="flex flex-col w-[50%]">
                        <label htmlFor='email' className='text-white text-1.5xl' >Email</label>
                        <input
                            type='text'
                            value={user.email}
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                            className=' password-input pl-2 w-[100%]  border border-white border-b-2 border-l-0 border-t-0 border-r-0 mb-4 mt-0 outline-none focus:border-b-yellow-400 text-white bg-transparent'
                            // placeholder='Enter your email'
autoComplete="new-password"
                        />
                    </div>
                </div>
                {/* password feild */}
                <div className='w-[100%] flex flex-col justify-center items-center' >
                    <div className="flex flex-col w-[50%]">
                        <label htmlFor='username' className='text-white text-1.5xl'  >password</label>
                        <input
                            type='password'
                            value={user.password}
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                            className=' password-input pl-2 w-[100%]  border border-white border-b-2 border-l-0 border-t-0 border-r-0  mt-0 outline-none focus:border-b-yellow-400 text-white bg-transparent'
                            // placeholder='Enter your password'
autoComplete="new-password"
                        />
                    </div>
                </div>
                {/* forget password */}
                <div className='w-[50%] mb-2 flex flex-col  items-end'  >
                    <Link href='/forgetpassword' className='text-white hover:underline'>
                        forget password?
                    </Link>
                </div>
                {/* login btn */}
                <button
                    onClick={onlogin}
                    className=' w-[50%] bg-yellow-500 text-green-950 font-bold  p-2 border border-gray-300 rounded lg mb-2 focus:outline-none focus:border-gray-600'
                >Login Here</button>
                {/* for sign up */}
                <Link href='/signup' className=' w-[50%] bg-yellow-500 text-green-950 font-bold text-center  p-2 border border-gray-300 rounded lg mb-4 focus:outline-none focus:border-gray-600'>
                    Don't have an account? Signup
                </Link>
            </div>
        </div>
    )
}

export default login
