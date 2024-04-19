import { Request, Response } from "express";
import { promises as fs } from "fs";
import path from "path";
import { promisify } from "util";
import { exec as execCallback } from "child_process";

const exec = promisify(execCallback);

async function saveCodeToFile(code: string) {
  const filePath = path.join(__dirname, "execute.js");
  await fs.writeFile(filePath, code);
  return filePath;
}

async function executeJS(code: string) {
  try {
    const filePath = await saveCodeToFile(code);
    const { stdout, stderr } = await exec(`node ${filePath}`);

    await fs.unlink(filePath);

    // Handling errors first from stderr
    if (stderr) return { error: stderr };
    else return { result: stdout };
  } catch (e) {
    let errorMessage = "Something went wrong";

    if (e && typeof e === "object" && "message" in e) {
      errorMessage = e.message as string;
    }

    return {
      error: errorMessage,
    };
  }
}

export default async function handleCompute(req: Request, res: Response) {
  const { code } = req.body;

  const result = await executeJS(code);

  if (result.error) res.status(422);

  res.json(result);
}
