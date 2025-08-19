import { NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { sendEmail } from "@/helpers/mailer";
import bcrypt from 'bcryptjs'


connect();

export async function POST(request) {
    try {
        const reqBody = await request.json()
        const { email, password, confirmPassword, token } = reqBody;
        console.log(email)
        if (password && confirmPassword && token && !email) {
            console.log('password recieved at the backend', password, confirmPassword, token)
            const user = await User.findOne({ forgetPasswordToken: token, forgetPasswordExpiry: { $gt: new Date() } })
            console.log("user found with the forget token again", user)
            const encryptedPassowrd = await bcrypt.hash(password, 10)
            console.log(encryptedPassowrd, password)
            user.password = encryptedPassowrd;
            user.forgetPasswordToken = undefined
            user.forgetPasswordExpiry = undefined
            const newuserpassword = user.password
            const decryptedpasswowrd = await bcrypt.compare(password, user.password)
            console.log(user, user.forgetPasswordExpiry, newuserpassword, decryptedpasswowrd)
            await user.save()



            return NextResponse.json({ message: 'password changed succeesfully' })
        } else {
            const user = await User.findOne({ email })
            console.log("user exist", user._id)
            console.log("user exist hello", user._id)
            // checking if the error in the send email
            try {
                await sendEmail({ email: user.email, emailType: "RESET", userId: user._id })

            } catch (error) {
                console.log("ERROR IN THE  email", error)
            }
            return NextResponse.json({ message: "user exist", email: user.email })
        }


    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });

    }
}