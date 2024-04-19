import { createServer, createWsServer } from "./server";
import { log } from "@repo/logger";
import http from "http";
import { spawn } from "node-pty";

const shell = "bash";

const port = process.env.PORT || 8080;
const app = createServer();
const server = http.createServer(app);
const wss = createWsServer(server);

wss.on("connection", async (ws) => {
  const ptyProcess = spawn(shell, [], {
    name: "xterm-color",
    env: process.env,
  });

  ws.on("message", (message: string) => {
    const data = JSON.parse(message.toString());

    if (data.type === "connect") {
      console.log(data?.payload);
    }

    // Catch incoming request
    if (data.type === "command") {
      ptyProcess.write(data?.payload?.message);
    }
  });

  ws.on("close", () => {
    console.log("closed ws");
  });

  // Output: Sent to the frontend
  // @ts-expect-error -- Valid
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
  log(`server running on ${port}`);
});
