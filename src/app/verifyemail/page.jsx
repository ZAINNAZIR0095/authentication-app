'use client'

import axios from "axios"
import Link from "next/link"
import React, { useEffect, useState } from "react"

export default function verifyEmailPage() {
    const [token, setToken] = useState("")
    const [verified, setVerified] = useState(false)
    const [error, setError] = useState(false)

    const verifyEmail = async () => {
        try {
            console.log(token)
            await axios.post('/api/users/verifyemail', { token: token })
            setVerified(true)
        } catch (error) {
            setError(true)
            console.log(error.message)
        }
    }

    useEffect(() => {
        const urltoken = window.location.search.split('=')[1];
        setToken(urltoken || '');
    }, [])

    useEffect(() => {
        if (token.length > 0) {
            verifyEmail()
        }
    }, [token])

    return (
        <div className=" bg-[url('/background.png')] h-[100vh] w-[100%] bg-no-repeat lg:bg-center bg-cover 	bg-right-bottom" >
            <div className='w-[100%] lg:w-[50%] h-[100%] flex flex-col items-center justify-center m-0 p-0' >
                <h1 className={`font-[var(--font-lobster)] , cursive]  text-white  text-5xl  mb-6`} >Verify Email</h1>
                <h2 className=" text-white  text-sm  mb-6" > Token :  {token ? `${token}` : "No Token"}</h2>

                {verified && (
                    <div className='w-[50%] mb-2 flex flex-col  items-center'>
                        <h2 className="w-[100%] text-center text-2xl text-white bg-purple-500 p-2 rounded-lg" >Email Verified</h2>
                        <Link href='/login' className=' text-center w-[50%] bg-yellow-500 text-green-950 font-bold  p-2 border border-gray-300 rounded lg my-2 focus:outline-none focus:border-gray-600'>
                            Login
                        </Link>
                    </div>)}


            {
                error && (
                    <div className='w-[50%] mb-2 flex flex-col  items-center'>
                        <h2 className="w-[100%] text-center text-2xl text-white bg-red-500 p-2 rounded-lg" >error</h2>

                    </div>
                )
            }
            </div>
        </div>
    )
}