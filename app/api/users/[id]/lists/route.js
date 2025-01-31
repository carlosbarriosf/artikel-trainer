import List from "@models/list";
import { connectToDB } from "@utils/database";

export const GET = async (req, { params }) => {
  try {
    // throw new Error("Forced error");
    await connectToDB();
    //fixed await params error

    const { id } = await params;

    const userLists = await List.find({ creator: id }).populate("creator");

    return new Response(JSON.stringify(userLists), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", {
      status: 500,
    });
  }
};
