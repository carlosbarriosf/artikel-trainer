import List from "@models/list";
import { connectToDB } from "@utils/database"


export const GET = async (req, { params }) => {
    const {id} = params
    try {
        await connectToDB();
        const list = await List.findById(id)
        if (!list) return new Response('List not found', { status: 404 })

        return new Response(JSON.stringify(list), { status: 200 })
    } catch (error) {
        return new Response('Failed to get the list', { status: 500 })
    }
}

export const PATCH = async (req, { params }) => {
    const {id} = params;
    const list = await req.json()
    try {
        await connectToDB();
        
        const existingList = await List.findById(id)
        if(!existingList) return new Response('List not found', { status: 404 });

        existingList.list = list;

        await existingList.save()

        return new Response('List succesfully updated', { status: 200 })
    } catch (error) {
        return new Response('There was an error updating the list', { status: 500 })
    }
}

export const DELETE = async (req, { params }) => {
    const {id} = params;
    try {
        await connectToDB();

        await List.findByIdAndDelete(id);
        
        return new Response('List deleted succesfully', { status: 200 })
    } catch (error) {
        return new Response('There was an error deleting the list', { status: 500 })
    }
}