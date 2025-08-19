'use client';
import axios from "axios";
import React, { use, useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import Image from "next/image";

export default function ForgetPasswordPage() {
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        token: ''
    })
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [passwordmenu, setPasswordMenu] = useState(false);
    const [token, setToken] = useState('');
    useEffect(() => {
        console.log('user changed', user.token.length, user.password.length, user.confirmPassword.length)
        if (user.token.length > 0 && user.password.length > 0 && user.confirmPassword.length > 0) {
            setButtonDisabled(false);
            console.log(buttonDisabled)
        } else {
            setButtonDisabled(true);
        }
    }, [user.confirmPassword, user.password, user.token])

    useEffect(() => {
        if (window.location.search.split("=")[1]) {
            console.log("Token exists");
            const token1 = String(window.location.search.split("=")[1]) || ''
            console.log("Token exists", token1);
            setToken(token1)
            setUser({ ...user, token: token1 })
            setPasswordMenu(true)
        } else {
            console.log(window.location.search.split("=")[1])
        }
    }, [])


    const checkEmail = async () => {
        console.log(user.email)
        const response = await axios.post('/api/users/forgetpassword', { email: user.email })
        console.log(response.data)
        if (response.data.email === user.email) {
            setPasswordMenu(true)
        }

    }
    const changePassword = async () => {
        console.log(user.password, user.confirmPassword)
        const response = await axios.post('/api/users/forgetpassword', { password: user.password, confirmPassword: user.confirmPassword, token: user.token })
        console.log(response.data.message)
        router.push('/login')

    }
    if (!passwordmenu) {
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
                        <h1 className={`font-[var(--font-lobster)] , cursive]  text-white  text-5xl  mb-6`} >CHECK ACCOUNT</h1>
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
                    {/* check btn */}
                    <button
                        onClick={checkEmail}
                        className=' w-[50%] bg-yellow-500 text-green-950 font-bold  p-2 border border-gray-300 rounded lg mb-2 focus:outline-none focus:border-gray-600'
                    >Login Here</button>

                </div>
            </div>
        )


        //    return( <div className='flex flex-col items-center justify-center min-h-screen py-2' >
        //         <h1>{'change password'}</h1>
        //         <hr />

        //         <label htmlFor='email'>enter your email for the forget password</label>
        //         <input
        //             type='text'
        //             value={user.email}
        //             onChange={(e) => setUser({ ...user, email: e.target.value })}
        //             className='p-2  border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600' 
        //             placeholder='email'
        //         />
        //  <button 
        //     onClick={checkEmail}
        // className='p-2 border border-gray-300 rounded lg mb-4 focus:outline-none focus:border-gray-600'
        //  >check Email</button>
        // </div>)
    }
    if (passwordmenu) {
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
                        <h1 className={`font-[var(--font-lobster)] , cursive]  text-white  text-5xl  mb-6`} >change password</h1>
                    </div>
                    {/*token feild*/}
                    <div className=' flex flex-col w-[50%]'>
                        {token ? <label htmlFor='email' className='text-white text-1.5xl'>token </label> : <label htmlFor='email' className='text-white text-1.5xl'>token :  <span>check your email for token</span></label>}

                        <input
                            type='text'
                            value={token || ""}
                            onChange={
                                (e) => {
                                    setUser({ ...user, token: e.target.value })
                                }
                            }
                            className=' password-input pl-2 w-[100%]  border border-white border-b-2 border-l-0 border-t-0 border-r-0 mb-4 mt-0 outline-none focus:border-b-yellow-400 text-white bg-transparent'
                            // placeholder='Enter your email'
                            autoComplete="new-password"
                        />
                    </div>
                    {/* password feild */}
                    <div className=' flex flex-col w-[50%]'>
                        <label htmlFor='email' className='text-white text-1.5xl'>password</label>
                        <input
                            type='text'
                            value={user.password}
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                            className=' password-input pl-2 w-[100%]  border border-white border-b-2 border-l-0 border-t-0 border-r-0 mb-4 mt-0 outline-none focus:border-b-yellow-400 text-white bg-transparent'
                            // placeholder='Enter your email'
                            autoComplete="new-password"
                        />
                    </div>
                    {/* confirm password */}
                    <div className=' flex flex-col w-[50%]'>
                        <label htmlFor='confirm password' className='text-white text-1.5xl'> confirm password</label>
                        <input
                            type=' confirm password'
                            value={user.confirmPassword}
                            onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
                            className=' password-input pl-2 w-[100%]  border border-white border-b-2 border-l-0 border-t-0 border-r-0 mb-4 mt-0 outline-none focus:border-b-yellow-400 text-white bg-transparent'
                            // placeholder='Enter your email'
                            autoComplete="new-password"
                        />
                    </div>
                    {/* change password btn */}
                           <button
                        onClick={changePassword}
                        className=' w-[50%] bg-yellow-500 text-green-950 font-bold  p-2 border border-gray-300 rounded lg mb-2 focus:outline-none focus:border-gray-600 '
                    >{!buttonDisabled ? "change password" : "buttonDisabled: fill all fields"}</button>

                </div>
            </div>
        )
    }



    {/* //     <div className='flex flex-col items-center justify-center min-h-screen py-2' >
            //         <h1>{'change password'}</h1>
            //         <hr />
            //         {token ? <label htmlFor='email'>token </label> : <label htmlFor='email'>token :  <span>check your email for token</span></label>}

            //         <input
            //             type='text'
            //             value={token || ""}
            //             onChange={

            //                 (e) => {
            //                     setUser({ ...user, token: e.target.value })
            //                 }
            //             }
            //             className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
            //             placeholder='Enter your token'
            //         />

            //         <label htmlFor='email'>password</label>
            //         <input
            //             type='text'
            //             value={user.password}
            //             onChange={(e) => setUser({ ...user, password: e.target.value })}
            //             className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
            //             placeholder='Enter your new password'
            //         />
            //         <label htmlFor='confirm password'> confirm password</label>
            //         <input
            //             type=' confirm password'
            //             value={user.confirmPassword}
            //             onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
            //             className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
            //             placeholder='Enter your password'
            //         />
            //         <button
            //             onClick={changePassword}
            //             className='p-2 border border-gray-300 rounded lg mb-4 focus:outline-none focus:border-gray-600'
            //         >{!buttonDisabled ? "change password" : "buttonDisabled: fill all fields"}</button>


            //     </div> */}



}