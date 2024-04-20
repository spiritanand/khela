import { NextRequest } from "next/server";
import redis from "@/lib/redis";

export async function POST(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");

  if (!id)
    return Response.json(
      { success: false, message: "No ID provided" },
      { status: 400 },
    );

  const { files } = await request.json();

  const ground = await redis.get(id);
  if (!ground)
    return Response.json(
      { success: false, message: "No data found" },
      { status: 404 },
    );

  const { name, type } = JSON.parse(ground);

  const updatedFiles = {
    files,
    name,
    type,
  };

  await redis.set(id, JSON.stringify(updatedFiles));

  return Response.json({ success: true });
}
