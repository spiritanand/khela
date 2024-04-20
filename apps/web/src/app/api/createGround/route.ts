import { NextRequest } from "next/server";
import { nanoid } from "nanoid";
import files from "@/components/editor/files";
import redis from "@/lib/redis";

export async function POST(request: NextRequest) {
  const { name, type } = await request.json();

  const id = nanoid();
  const ground = {
    id,
    name,
    type,
    // @ts-ignore
    files: files[type],
  };

  redis.set(id, JSON.stringify(ground));

  return Response.json({ success: true, ground });
}
