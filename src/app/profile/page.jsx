"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import toast from 'react-hot-toast'
import Image from 'next/image'


function Page() {
    const router = useRouter();
    const [userData, setUserData] = React.useState({
        id  :'' , 
        email : '' , 
        username : ''
    })
    const [userDataPage , setUserDataPage] = useState(true)

    const logout = async () => {
        try {
            await axios.get('/api/users/logout')
            toast.success('Logged out successfully')
            router.push('/login')
        } catch (error) {
            console.log(error.message);
            toast.message(`${error.message}`)
        }
    }
    const getUserId = async () => {
        const response = await axios.get('/api/users/me')
        console.log(response.data.data._id  , response.data.data.email  , response.data.data.username  )
        setUserData({id : response.data.data._id  , email :  response.data.data.email  ,username : response.data.data.username } )
        setUserDataPage(true)
    }
    useEffect(()=>{
       console.log(userData.id)
        console.log(userData.email , userData.id ===!"" , userData.id ==="" ) 
    } , [userData])

  if(userData.id ==="" ) { return (
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
                                <h1 className={`font-[var(--font-lobster)] , cursive]  text-white  text-5xl  mb-4`} >Profile Page</h1>
                            </div>
                              <p className='text-center mt-0 mx-2 text-white'>This is the profile page. You can view your profile information here.</p>
                            {/* logout btn */}
                            <button onClick={logout}  className=' w-[40%]  bg-yellow-500 text-green-950 font-bold  p-2 border border-gray-300 rounded lg mb-2 mt-4 focus:outline-none focus:border-gray-600 ' >Logout</button>
                            {/*get user details  */}
                                       <button onClick={getUserId}  className='bg-purple-500 w-[40%] text-green-950 font-bold  p-2 border border-purple-300 rounded lg mb-2 mt-4 focus:outline-none focus:border-gray-600 ' >Get User Details</button>
            </div>
        </div>
        //  <h1 className='text-2xl font-bold text-center mt-10'>Profile Page</h1>
        //     <h2 className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-400 mt-4 ${id === ''?'hidden':''}`}><Link href={`/profile/${id}`} >{id}</Link></h2>
        //     <p className='text-center mt-4 mx-2'>This is the profile page. You can view and edit your profile information here.</p>
        //     <hr />
        //     <button onClick={logout}  className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-400 mt-4' >Logout</button>
        //     <button onClick={getUserId}  className='bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-400 mt-4' >Get User Details</button>
    )
}

    if(userData.id !=="") {   return(
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
                                <h1 className={`font-[var(--font-lobster)] , cursive]  text-white  text-5xl  mb-4`} >User Information</h1>
                            </div>
{/* user details */}

                              <p className='text-center mt-0 mx-2 text-white'>{`username : ${userData.username}`}</p>
                              <p className='text-center mt-0 mx-2 text-white'>{`email : ${userData.email}`}</p>
                              <p className='text-center mt-0 mx-2 text-white'>{`userid : ${userData.id}`}</p>

      {/* logout btn */}
                            <button onClick={logout}  className=' w-[40%]  bg-yellow-500 text-green-950 font-bold  p-2 border border-gray-300 rounded lg mb-2 mt-4 focus:outline-none focus:border-gray-600 ' >Logout</button>
                           
                            </div>
                            </div>
    )
}
}
export default Page
