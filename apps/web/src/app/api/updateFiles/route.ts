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

  redis.set(id, JSON.stringify(files));

  return Response.json({ success: true, files });
}
