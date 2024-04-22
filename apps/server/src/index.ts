import { createServer, createWsServer } from "./server";
import http from "http";
import { spawn } from "node-pty";
import { saveCodeToFile } from "./controllers/compute/handleCompute";

const shell = "bash";

const port = process.env.PORT || 8081;
const app = createServer();
const server = http.createServer(app);
const wss = createWsServer(server);

wss.on("connection", async (ws) => {
  const ptyProcess = spawn(shell, [], {
    name: "xterm-color",
    env: process.env,
  });

  ws.on("message", async (message: string) => {
    const data = JSON.parse(message.toString());

    if (data.type === "connect") {
      console.log(data?.payload);
    }

    // Catch incoming request
    if (data.type === "command") {
      ptyProcess.write(data?.payload?.message);
    }

    if (data.type === "execute") {
      if (!data?.payload?.code) return;

      const filePath = await saveCodeToFile(data?.payload?.code?.value);

      ptyProcess.write(`node ${filePath}\n`);
    }
  });

  ws.on("close", () => {
    console.log("closed ws");
  });

  // Output: Sent to the frontend
  // @ts-expect-error -- Library function
  ptyProcess?.on("data", function (data: string) {
    const message = {
      type: "command",
      payload: {
        message: data,
      },
    };

    ws.send(JSON.stringify(message));
  });
});

server.listen(port, () => {
  console.log(`server running on ${port}`);
});
