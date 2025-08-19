import { NextResponse } from "next/server";
//In Next.js App Router, you should export the method (e.g. GET) by name, not as default. so if i export export default async function GET(){} then it will not work so i need to export it as export async function GET(){}
export  async function GET() {
    try {
        const response = NextResponse.json({
    message: "logout successfully",
            status: true,
        })
        //as this is the api route means this is the backend so we will use the  response.cookies.set instead of the cookies.set because we will uses it in the backend file so the cookis.set function is will be atached with the next response as response.cookies.set
        response.cookies.set('token' , "" , {
            httpOnly : true , //means only the server will access this cookie and the user will not get it inthe console as cookies.get()
            expires :  new Date(0)
        })
        return response; 
    } catch (error) {
        return NextResponse.json({
        error : error.message
        })
    }
}