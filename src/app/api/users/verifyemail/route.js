import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest , NextResponse } from "next/server";
connect()
export async function POST(request){
    try {
        const reqBody = await request.json();
        const {token} = reqBody;
        console.log(token)
     const user =  await User.findOne({verifyToken : token ,verifiedTokenExpiry : {$gt :  new Date()}//{$gt :  Date.now()} this will check that weather the given token expiry is greater then the dat.now() (return the curren date in miliseconds)  it means that the expiry of the token is greater than the date.now()
        })
        // const user = await User.findOne({ email: 'five@gmail.com'})
        console.log( "here is the user" ,  user , user.verifyToken);
        if(!user){
            return NextResponse.json({error:"invalid token"} , {status : 400})
        }
        console.log(user.isVerified , user.verifyToken , user.verifiedTokenExpiry)

        user.isVerified = true ;
        user.verifyToken = undefined ;
        user.verifiedTokenExpiry = undefined ;
        await user.save()

        return NextResponse.json({
            message : "user verified successfully" , 
            success : true
        })

    } catch (error) {
        return NextResponse.json({error : error.message} , { status : 500 })
    }
}