


import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server"





export const middleware = async (req) => {

    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
        return NextResponse.redirect(
            new URL('/', req.url)
        )
    }

    return NextResponse.next()

}

export const config = {
    matcher: ['/create-list', '/discover-lists', '/myprofile']
}