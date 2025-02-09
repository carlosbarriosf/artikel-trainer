import User from "@models/user";
import { connectToDB } from "@utils/database";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google"

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    callbacks: {
        async session({ session }) {
            // const userSession = await User.findOne({
            //     email: session.user.email
            // })
    
            // session.user.id = userSession._id.toString()
    
            // return session;
            try {
                connectToDB();
                const userSession = await User.findOne({
                email: session.user.email
                })

                if(userSession) {
                    session.user.id = userSession._id.toString()
                } else {
                    console.warn("No user found for session")
                }
        
                return session;
            } catch (error) {
                console.log(error)
                return {
                    ...session,
                    user: {...session.user, id: null}
                }
            }
        },
        async signIn({ profile }) {
            try {
                await connectToDB()
    
                const user = await User.findOne({
                    email: profile.email
                })
    
                if(!user) {
                    await User.create({
                        email: profile.email,
                        username: profile.name.replace(" ", "").toLowerCase(),
                        image: profile.picture
                    })
                    
                }
                
                return true;
    
            } catch (error) {
                console.log(error);
                return false
            }
        }
    }
})

export { handler as GET, handler as POST}