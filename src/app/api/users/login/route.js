import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'


connect();

export async function POST(request) {
    try {
        const reqBody = await request.json(); 
        const {email, password} = reqBody;
        console.log('data from the frontend login', reqBody , email);
      const user = await User.findOne({email})
      console.log(user)
        if (!user) {
            console.log('user not found');
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
        // check if the password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            console.log('invalid password');
            return NextResponse.json({ message: "Invalid password" }, { status: 401 });
        }

        // create token data
        const tokenData = {
            id: user._id,
            email: user.email,
            username: user.username,
        };

        // creating a  JWT token 
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, { expiresIn: '1d' });

        const response = NextResponse.json({
            message: "Login successful",
            success : true,
        })
        response.cookies.set('token', token, {
            httpOnly: true
        })
        return response;



        
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}