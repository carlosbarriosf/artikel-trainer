import List from "@models/list";
import { connectToDB } from "@utils/database"


export const GET = async (req, res) => {
    try {
        
        await connectToDB();

        const url= new URL(req.url);
        const searchQuery = url.searchParams.get('q') || ''
        console.log(searchQuery)
        const page = parseInt(url.searchParams.get('page')) || 1;
        const limit = parseInt(url.searchParams.get('limit')) || 18; 
        const sort = url.searchParams.get('sort') || '';
        const skip = (page - 1) * limit;
        console.log(sort)

        const filter = searchQuery
            ? {'list.name': {$regex: searchQuery, $options: 'i'}}
            : {};


        let lists;
        if (sort === "likes-asc" || sort === "likes-desc") {
            const direction = sort === "likes-asc" ? 1 : -1;
            lists = await List.find(filter)
              .populate('creator')
              .sort({likeCount: direction})
              .skip(skip)
              .limit(limit)
          } else if (sort === "title-asc" || sort === "title-desc") {
            const direction = sort === "title-asc" ? 1 : -1;
            lists = await List.find(filter)
              .populate("creator")
              .collation({ locale: "en", strength: 2 }) // Enable case-insensitive sorting
              .sort({ "list.name": direction })
              .skip(skip)
              .limit(limit);
          } else {
            lists = await List.find(filter)
              .populate("creator")
              .skip(skip)
              .limit(limit);
          }
      
          const totalItems = await List.countDocuments(filter);
      
          return new Response(
            JSON.stringify({
              lists,
              pagination: {
                totalItems,
                totalPages: Math.ceil(totalItems / limit),
                currentPage: page,
              },
            }),
            { status: 200 }
          );
    } catch (error) {
        return new Response('Failed to fetch lists', {status: 500})
    }
}