import { Request, Response } from "express";

export default async function handleCompute(req: Request, res: Response) {
  res.json({ success: true });
}
