"use client";

import Editor, { OnMount } from "@monaco-editor/react";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { editor } from "monaco-editor";
import Terminal from "@/components/terminal";

export function MonacoEditor() {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

  const handleEditorDidMount: OnMount = (editor) => {
    editorRef.current = editor;
  };

  function showValue() {
    console.log(editorRef?.current?.getValue());
  }

  return (
    <>
      <Editor
        height="70vh"
        defaultLanguage="javascript"
        defaultValue="// some comment"
        onMount={handleEditorDidMount}
        theme="vs-dark"
      />

      <Button onClick={showValue}>Execute</Button>

      <Terminal />
    </>
  );
}
