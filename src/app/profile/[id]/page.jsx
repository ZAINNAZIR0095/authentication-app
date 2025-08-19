import React from 'react'

function Page({params}) {

    return (
            <div className='flex flex-col items-center justify-center min-h-screen py-2'>
            <h1 className='text-2xl font-bold text-center my-10'>Profile Page</h1>
            <hr />
            <div className='text-4xl' > Profile page ID: <span className='p-2 rounded bg-orange-500' > {params.id}</span></div>
            </div>
    )
}

export default Page
