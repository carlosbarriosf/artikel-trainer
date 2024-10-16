import List from "@models/list";
import { connectToDB } from "@utils/database"


export const GET = async (req, { params }) => {
    
    try {
        await connectToDB();

        const userLists = await List.find({ creator: params.id }).populate('creator')
        
        return new Response(JSON.stringify(userLists), { status: 200 })
    } catch (error) {
        console.log(error)
        return new Response('Failed to fetch lists created by user', { status: 500 })
    }
}