"use client";

import Editor, { OnMount } from "@monaco-editor/react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { editor } from "monaco-editor";
import dynamic from "next/dynamic";
import files from "./files";

const XTerminal = dynamic(() => import("src/components/xterminal"), {
  ssr: false,
});

export function MonacoEditor() {
  const [fileName, setFileName] = useState("script.js");
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

  // @ts-ignore
  const file = files[fileName];

  const handleEditorDidMount: OnMount = (editor) => {
    editorRef.current = editor;
  };

  function showValue() {
    console.log(editorRef?.current?.getValue());
  }

  useEffect(() => {
    editorRef.current?.focus();
  }, [file.name]);

  return (
    <>
      <Button
        disabled={fileName === "script.js"}
        onClick={() => setFileName("script.js")}
      >
        script.js
      </Button>
      <Button
        disabled={fileName === "style.css"}
        onClick={() => setFileName("style.css")}
      >
        style.css
      </Button>
      <Button
        disabled={fileName === "index.html"}
        onClick={() => setFileName("index.html")}
      >
        index.html
      </Button>
      <Editor
        height="60vh"
        theme="vs-dark"
        path={file.name}
        defaultLanguage={file.language}
        defaultValue={file.value}
        onMount={handleEditorDidMount}
      />

      <Button onClick={showValue}>Execute</Button>

      <XTerminal />
    </>
  );
}
