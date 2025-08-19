// In Next.js, “helpers” usually refer to utility functions or shared logic that make your code cleaner and more reusable. They’re not a built-in feature, but a common best practice to organize your project.

import jwt from 'jsonwebtoken'

export function getDataFromToken(request){
try {
    const token = request.cookies.get('token')?.value || '';
    const decodedToken = jwt.verify(token , process.env.TOKEN_SECRET)
    return decodedToken.id;
} catch (error) {
    console.log(`error in the helper` , error)
    throw new Error(error.message)
}
}