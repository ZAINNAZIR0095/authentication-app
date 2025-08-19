// window.location.href is will be used to get the url from the search bar

import nodemailer from 'nodemailer'
import User from '@/models/userModel'
import bcrypt from "bcryptjs";

export async function sendEmail({ email, emailType, userId }) {//email is used where we will want to send the the email to verify or forget password of the email , emailtype define that what type of this email means is it for the email verification or it is will be for the forget password userid is will be used for user data like email username etc
    try {
        // creating the token for verification or forget password
        const hashedToken = await bcrypt.hash(userId.toString(), 10)//this is the encrypted token(which is created based on the user id we wi;; create it with any random string but here we will uses the userId)
        console.log(email , emailType , "object id"  , userId.toString() , hashedToken)
        if (emailType === "VERIFY") {
       const updatedUser = await User.findOneAndUpdate(userId, {
                verifyToken: hashedToken,
                verifiedTokenExpiry: Date.now() + 1000 * 60 * 60 * 24
            })
            console.log( "user is updated for verification" ,  updatedUser , updatedUser.verifyToken , updatedUser.verifiedTokenExpiry)
        } else if (emailType === "RESET") {
            console.log("type is reset")
         const newUser =    await User.findOneAndUpdate(userId, {
                forgetPasswordToken: hashedToken,
                forgetPasswordExpiry: Date.now() + 1000 * 60 * 60 * 24
            })
            console.log( "updated user" , newUser)
        }
        // creating the email service
        const transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            // secure: false, // true for 465, false for other ports
            auth: {
                user: '36a63f4b2ae8dd',
                pass: '9b171c794a014b'
            },
        });
        const mailOptions = {
            from: '<zainnazir@gmail.com>',
            to: email,
            subject: emailType === "VERIFY" ? "verify your email" : "forget your password",
            text: "Hello world?", // plain‑text body
            html: `<p>Click <a href='${process.env.DOMAIN}/${emailType === "VERIFY" ? 'verifyemail' : 'forgetpassword'}?token=${hashedToken}' >here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy or paste the link in your browser below <br> 
            ${process.env.DOMAIN}/${emailType === "VERIFY" ? 'verifyemail' : 'forgetpassword'}?token=${hashedToken}
       </p> `
        }
        const mailresponse = await  transporter.sendMail(mailOptions)
        return mailresponse;

    } catch (error) {
        throw new Error(error.message)
    }
}