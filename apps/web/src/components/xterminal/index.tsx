"use client";

// Credits - https://www.eddymens.com/blog/creating-a-browser-based-interactive-terminal-using-xtermjs-and-nodejs

import { useEffect, useState } from "react";
import TerminalDiv from "@/components/xterminal/TerminalDiv";
import { Terminal } from "@xterm/xterm";
import { Button } from "@/components/ui/button";

const term = new Terminal({ cursorBlink: true });

function xt({ code }: { code: string }) {
  const [webSocket, setWebSocket] = useState<WebSocket>(
    () => new WebSocket(process.env.NEXT_PUBLIC_WS_URL!),
  );

  function handleExecute() {
    const data = {
      type: "execute",
      payload: {
        code,
      },
    };

    webSocket.send(JSON.stringify(data));
  }

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
      setWebSocket(new WebSocket(process.env.NEXT_PUBLIC_WS_URL!));
    };

    return () => {
      webSocket.close();
    };
  }, [webSocket]);

  return (
    <>
      <Button onClick={handleExecute}>Execute</Button>

      <TerminalDiv ws={webSocket} term={term} />
    </>
  );
}

export default xt;
