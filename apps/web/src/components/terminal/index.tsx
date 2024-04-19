"use client";

import { Terminal } from "@xterm/xterm";
import { useEffect, useRef } from "react";
import "@xterm/xterm/css/xterm.css";

const term = new Terminal({ cursorBlink: true });

function t() {
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!terminalRef.current) return;

    term.open(terminalRef.current);
    term.write("Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ");
  }, [terminalRef]);

  return <div id="terminal" ref={terminalRef}></div>;
}

export default t;
