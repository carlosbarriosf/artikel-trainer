


import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server"





export const middleware = async (req) => {
    console.log("Middleware executed for URL:", req.url);

    try {
        const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
        console.log("Token:", token);

        if (!token) {
            console.log("No token found, redirecting...");
            return NextResponse.redirect(new URL('/', req.url));
        }

        return NextResponse.next();
    } catch (error) {
        console.error("Middleware error:", error);
        return NextResponse.redirect(new URL('/', req.url));
    }
};



export const config = {
    matcher: ['/create-list', '/discover-lists', '/profile/:path*', '/edit-list']
}

