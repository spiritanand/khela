import { promises as fs } from "fs";
import path from "path";

export async function saveCodeToFile(code: string) {
  const filePath = path.join(__dirname, "execute.js");
  await fs.writeFile(filePath, code);

  return filePath;
}

// async function executeJS(code: string) {
//   try {
//     const filePath = await saveCodeToFile(code);
//     const { stdout, stderr } = await exec(`node ${filePath}`);
//
//     // cleanup
//     await fs.unlink(filePath);
//
//     // Handling errors from stderr
//     if (stderr) return { result: stderr };
//     else return { result: stdout };
//   } catch (e) {
//     let errorMessage = "Something went wrong";
//
//     if (e && typeof e === "object" && "message" in e)
//       errorMessage = e.message as string;
//
//     return {
//       result: errorMessage,
//     };
//   }
// }
