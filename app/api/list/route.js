import List from "@models/list";
import { connectToDB } from "@utils/database"


export const GET = async (req, res) => {
    try {
        
        await connectToDB();

        const url= new URL(req.url);
        const searchQuery = url.searchParams.get('q') || ''
        console.log(searchQuery)

        const filter = searchQuery
            ? {'list.name': {$regex: searchQuery, $options: 'i'}}
            : {};

        const lists = await List.find(filter).populate('creator');

        return new Response(JSON.stringify(lists), {status: 200})

    } catch (error) {
        return new Response('Failed to fetch lists', {status: 500})
    }
}