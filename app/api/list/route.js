import List from "@models/list";
import { connectToDB } from "@utils/database"


export const GET = async (req, res) => {
    try {
        
        await connectToDB();
        const lists = await List.find({}).populate('creator');

        return new Response(JSON.stringify(lists), {status: 200})

    } catch (error) {
        return new Response('Failed to fetch lists', {status: 500})
    }
}