"use client";

import { useEffect, useState } from "react";
import TerminalDiv from "@/components/xterminal/TerminalDiv";
import { Terminal } from "@xterm/xterm";

const term = new Terminal({ cursorBlink: true });

function xt() {
  const [webSocket, setWebSocket] = useState<WebSocket>(
    () => new WebSocket("ws://localhost:8080"),
  );

  useEffect(() => {
    // connect to ws
    webSocket.onopen = () => {
      webSocket.send(
        JSON.stringify({
          type: "connect",
          payload: {
            ping: "pong",
          },
        }),
      );
    };

    // handle message
    webSocket.onmessage = (event: MessageEvent<string>) => {
      const data = JSON.parse(event.data);

      if (data.type === "command") {
        term.write(data?.payload?.message);
      }
    };

    // recreating ws connection on close
    webSocket.onclose = () => {
      setWebSocket(new WebSocket("ws://localhost:8080"));
    };

    return () => {
      webSocket.close();
    };
  }, [webSocket]);

  return <TerminalDiv ws={webSocket} term={term} />;
}

export default xt;
