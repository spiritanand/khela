"use client";

import Editor, { OnChange, OnMount } from "@monaco-editor/react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { editor } from "monaco-editor";
import dynamic from "next/dynamic";
import files from "./files";

const XTerminal = dynamic(() => import("src/components/xterminal"), {
  ssr: false,
});

export function MonacoEditor() {
  const [fileName, setFileName] = useState("index.html");
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const previewRef = useRef<HTMLIFrameElement | null>(null);

  // @ts-ignore
  const file = files[fileName];

  const handleEditorDidMount: OnMount = (editor) => {
    editorRef.current = editor;
  };

  function showValue() {
    console.log(editorRef?.current?.getValue());
  }

  const handleChange: OnChange = (newValue: string | undefined, e) => {
    if (newValue === undefined) return;

    // @ts-ignore
    updateIframeContent(newValue, fileName.split(".")[1]);
  };

  function updateIframeContent(
    newValue: string,
    type: "html" | "css" | "js" = "html",
  ) {
    if (!previewRef.current) return;

    const iframe = previewRef.current;

    if (!previewRef.current) return;

    const parser = new DOMParser();

    const doc = parser.parseFromString(
      type === "html" ? newValue : files["index.html"].value,
      "text/html",
    );

    // Inject CSS
    const styleElement = doc.createElement("style");
    styleElement.textContent =
      type === "css" ? newValue : files["style.css"].value;
    doc.head.appendChild(styleElement);

    // Inject JavaScript
    const scriptElement = doc.createElement("script");
    scriptElement.textContent =
      type === "js" ? newValue : files["script.js"].value;
    doc.body.appendChild(scriptElement);

    // Ensure the iframe content window and document are accessible
    const iframeDoc = iframe.contentDocument;

    if (!iframeDoc) return;

    // Clear the current contents
    iframeDoc.open();
    iframeDoc.write(doc.documentElement.innerHTML);
    iframeDoc.close();
  }

  useEffect(() => {
    updateIframeContent(files["index.html"].value);
  }, []);

  useEffect(() => {
    editorRef.current?.focus();
  }, [file.name]);

  return (
    <div className="flex">
      <div className="flex-1">
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
          onChange={handleChange}
          options={{
            formatOnPaste: true,
            formatOnType: true,
            autoIndent: "full",
            "semanticHighlighting.enabled": true,
          }}
        />

        <Button onClick={showValue}>Execute</Button>

        <XTerminal />
      </div>

      <iframe ref={previewRef} className="flex-1"></iframe>
    </div>
  );
}
