import User from "@models/user"
import { connectToDB } from "@utils/database"


export const GET = async (req, {params}) => {
    const { id } = params
    try {
        await connectToDB()
        const user = await User.findById(id)
        return new Response(JSON.stringify(user), { status : 200 })
    } catch (error) {
        console.log(error)
        return new Response('Failed to fetch lists created by user', { status: 500 })
    }
}