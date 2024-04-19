import { createServer, createWsServer } from "./server";
import { log } from "@repo/logger";
import http from "http";

const port = process.env.PORT || 8080;
const app = createServer();
const server = http.createServer(app);
const wss = createWsServer(server);

wss.on("connection", async (ws) => {
  ws.on("message", (message: string) => {
    const data = JSON.parse(message.toString());
    console.log({ data });

    if (data.type === "connect") {
      console.log(data?.payload?.ping);
    }
  });

  ws.on("close", () => {
    console.log("closed ws");
  });
});

server.listen(port, () => {
  log(`server running on ${port}`);
});
