import List from "@models/list";
import { connectToDB } from "@utils/database";

export const POST = async (req, res) => {
  const { userId, list } = await req.json();
  const MAX_LISTS = 15; //setting the limit of lists per user
  try {
    // throw new Error("ForcedError");
    await connectToDB();

    const listCount = await List.countDocuments({ creator: userId });
    console.log(`this user has ${listCount} lists`);

    if (listCount >= MAX_LISTS) {
      return new Response(JSON.stringify({ message: "Limit reached" }), {
        status: 403,
      });
    }

    const newList = await List.create({
      creator: userId,
      list: list,
      likedBy: [],
    });

    return new Response(
      JSON.stringify({
        newList,
        message: "List created!",
      }),
      { status: 201 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Failed to create a new List" }),
      { status: 500 }
    );
  }
};
