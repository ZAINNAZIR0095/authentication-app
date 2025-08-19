import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";


connect();
export async function POST(request) {

    try {
        const reqBody = await request.json();//data from the frontend
        const { username, email, password } = reqBody;//destructuring the data
        console.log('data from the frontend', reqBody);

        const user = await User.findOne({ email });//the email which is come from the frontend is now send to the database to check if the user already exists findOne method will return the user if exists findOne method ko await zaroor karna parta hai agar await na karo to query return karega
        if (user ===!null ||  user?.email === reqBody.email) {//if user already exists then return error message
            console.log('user already exists');
            return NextResponse.json({message : "user already exists"});//if user exists then return error message in order to send the response to the frontend nextResponse.json method is used to send the response in json format
        }
        // console.log(user?.email === reqBody.email);

        // hashing(encrypting) the password
        const salt = await bcrypt.genSalt(10);//salt is used to hash the password it is the random string which is combined with the password to make it more secure
        const hashedPassword = await bcrypt.hash(password, salt);//hashing the password using bcrypt bcrypt.hash method takes two arguments first is the password and second is the salt it will return the hashed password the password is will be graped from the frontend

        // now create a new user in the database
        const newUser = new User({
            username,
            email,
            password: hashedPassword, // store the hashed password
        })
        console.log('new user created successfully', newUser);
      const savedUser =   await newUser.save()
        console.log(` user created succesfull ${savedUser}`);
try {
          await sendEmail({email , emailType:"VERIFY" , userId:savedUser._id })

} catch (error) {
    console.log(error.message)
    
}

            return NextResponse.json({
                message: "User created successfully",
                success: true,
                savedUser
            })


    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });//`1nextResponse.json method is used to send the response in json format if there is any error then it will return the error message with status code 500
    }
}