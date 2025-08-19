import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest , NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";


connect()

export async function GET(request){
    try {
     const userId =  await  getDataFromToken(request)
     console.log(userId)
   const user = await User.findOne({_id : userId}).select("-password")//user id se user find ho jaye ga oor jo baad me ham ne select lagaya he wo aik tarha ki query he jiss me jo bhi cheez likheen ge saath minus laga krr wo neglect ho gaye gi  , aik se zayada bhi cheezze neglect kar sakte hen as ('-password -email')bass darmeyan me comma nahi dalna kyu ke ye is ka syntax he
   console.log("the data of the me ujser details" , user)
   return NextResponse.json({
    message: 'user found' , 
    data : user 
   })
    } catch (error) {
        return NextResponse.json({error:error.message , status : 400})
        
    }
}