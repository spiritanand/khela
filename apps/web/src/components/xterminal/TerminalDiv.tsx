"use client";

import { Terminal } from "@xterm/xterm";
import { useEffect, useRef } from "react";
import "@xterm/xterm/css/xterm.css";

function terminalDiv({ term, ws }: { term: Terminal; ws: WebSocket }) {
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!terminalRef.current) return;

    term.open(terminalRef.current);

    term.onKey((e) => {
      const data = {
        type: "command",
        payload: {
          message: e.key,
        },
      };

      ws.send(JSON.stringify(data));
    });
  }, [terminalRef]);

  return (
    <div
      id="terminal"
      ref={terminalRef}
      className="max-h-[32vh] w-full overflow-scroll"
    />
  );
}

export default terminalDiv;
