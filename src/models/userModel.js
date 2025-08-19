import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'please enter your username'],
        unique: true
    },
    email: {
        type: String,
        required: [true, 'please enter your email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'please enter your password'],
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    forgetPasswordToken: String,
    forgetPasswordExpiry: Date,
    verifyToken: String,
    verifiedTokenExpiry: Date,
})

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;