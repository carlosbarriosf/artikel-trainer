import List from "@models/list"
import { connectToDB } from "@utils/database"


export const POST = async (req, res) => {
    const { userId, list } = await req.json()

try {
    await connectToDB()
    const newList = await List.create({
        creator: userId,
        list: list,
        likedBy: []
    })

    return new Response(JSON.stringify(newList), {status: 201})
} catch (error) {
    return new Response('Failed to create a new List', {status: 500})
}

}