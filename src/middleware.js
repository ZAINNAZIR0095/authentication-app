import { NextResponse } from 'next/server'

export function middleware(request) {
    // the mathchers we defined below if the request matches one of the paths, 
    const path = request.nextUrl.pathname// this syntax is used to get the path of the request matlab jis route se ham request kare ge wo get kare ga ye syntax e.g it will get "/login" or "/signup"
const isPublicPath =path === '/login' || path === '/signup' || path === '/verifyemail'

const token = request.cookies.get('token')?.value || '' // this will get the token from the cookies
if (isPublicPath && token){
    return NextResponse.redirect(new URL('/profile' , request.nextUrl))//agar conditions match ho jaye gi ham redirect kar de ge home page pe
}
if(!isPublicPath && !token){
     return NextResponse.redirect(new URL('/login' , request.nextUrl))
}

}

// See "Matching Paths" Ye define kar raha hai ke middleware kin kin routes pe chale ga.
// '/profile/:path*' iss ka matlab ye he agar params use ho raha he url me tou /profile/3234 ya phir /profile ke baad koi bhi cheez aye us par bhi ye middleware chale oor uss ko bhi protect kare
export const config = {
    matcher: ['/', '/login', '/signup', '/profile' , '/profile/:path*' , '/verifyemail']
}