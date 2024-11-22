import { NextResponse } from "next/server";
import { getHelloWorld } from "@/services/helloworld";

// GET: Fetch helloworld response
export async function GET() {
    const helloWorld = await getHelloWorld();
    console.log(helloWorld)
    return NextResponse.json(helloWorld, {status: 200});
}
  
// POST: Example of putting a user in a database (not actually implemented)
export async function POST(req: Request) {
    // const body = await req.json();
    // const newUser = await createUserInDatabase(body); // Your database logic here
    // return NextResponse.json(newUser, { status: 201 });
    return NextResponse.json('Nothing in this route', {status: 404})
}