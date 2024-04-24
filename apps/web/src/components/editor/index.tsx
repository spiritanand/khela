"use client";

import Editor, { OnChange, OnMount } from "@monaco-editor/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { editor } from "monaco-editor";
import dynamic from "next/dynamic";
import debounce from "lodash.debounce";
import { useParams } from "next/navigation";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

const XTerminal = dynamic(() => import("src/components/xterminal"), {
  ssr: false,
});

export default function MonacoEditor({
  name,
  type,
  initFiles,
}: {
  name: string;
  type: string;
  initFiles: any;
}) {
  const params = useParams<{ id: string }>();

  const isJs = type === "js";

  const [files, setFiles] = useState(initFiles);
  const [fileName, setFileName] = useState(isJs ? "index.html" : "index.js");
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const previewRef = useRef<HTMLIFrameElement | null>(null);

  // @ts-ignore
  const file = files[fileName];

  const handleEditorDidMount: OnMount = (editor) => {
    editorRef.current = editor;
  };

  // function showValue() {
  //   console.log(editorRef?.current?.getValue());
  // }

  const handleChange: OnChange = (updatedValue: string | undefined) => {
    if (updatedValue === undefined) return;

    if (isJs)
      // @ts-ignore
      updateIframeContent(updatedValue, fileName.split(".")[1]);
    else {
      const updatedState = {
        ...files,
        [fileName]: {
          ...files[fileName],
          value: updatedValue,
        },
      };

      setFiles(updatedState);

      debouncedUpdateFiles(updatedState);
    }
  };

  const updateFiles = useCallback((updatedFiles: any) => {
    void fetch(`/api/updateFiles?id=${params.id}`, {
      method: "POST",
      body: JSON.stringify({
        files: updatedFiles,
      }),
    });
  }, []);

  const debouncedUpdateFiles = useCallback(
    debounce(updateFiles, 5000, {
      leading: true,
      maxWait: 5000,
    }),
    [],
  );

  function updateIframeContent(
    updatedValue: string,
    type: "html" | "css" | "js" = "html",
  ) {
    if (!previewRef.current) return;

    const updatedState = {
      ...files,
      [fileName]: {
        ...files[fileName],
        value: updatedValue,
      },
    };

    setFiles(updatedState);

    debouncedUpdateFiles(updatedState);

    const iframe = previewRef.current;

    if (!previewRef.current) return;

    const parser = new DOMParser();

    const doc = parser.parseFromString(
      type === "html" ? updatedValue : files["index.html"].value,
      "text/html",
    );

    // Inject CSS
    const styleElement = doc.createElement("style");
    styleElement.textContent =
      type === "css" ? updatedValue : files["style.css"].value;
    doc.head.appendChild(styleElement);

    // Inject JS
    const scriptElement = doc.createElement("script");
    scriptElement.textContent = isJs ? updatedValue : files["script.js"].value;
    doc.body.appendChild(scriptElement);

    const iframeDoc = iframe.contentDocument;

    if (!iframeDoc) return;

    iframeDoc.open();
    iframeDoc.write(doc.documentElement.innerHTML);
    iframeDoc.close();
  }

  useEffect(() => {
    if (isJs) updateIframeContent(files["index.html"].value);
  }, []);

  useEffect(() => {
    editorRef.current?.focus();
  }, [file.name]);

  return (
    <>
      <h4 className="mt-2 scroll-m-20 text-center text-xl font-semibold tracking-tight">
        {name} - {type}
      </h4>
      <p className="mb-2 text-center text-xs">
        Please refresh if IDE not visible
      </p>

      <PanelGroup
        direction="horizontal"
        style={{
          height: "92vh !important",
        }}
      >
        <Panel>
          <PanelGroup
            direction="vertical"
            style={{
              height: "92vh !important",
            }}
          >
            <Panel>
              {files &&
                Object.keys(files)?.map((key) => (
                  <Button
                    key={key}
                    disabled={fileName === key}
                    onClick={() => setFileName(key)}
                  >
                    {key}
                  </Button>
                ))}

              <Editor
                height={isJs ? "92vh" : "60vh"}
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
            </Panel>

            {!isJs ? (
              <>
                <PanelResizeHandle className="bg-primary h-1" />

                <Panel
                  style={{
                    overflowY: "auto",
                  }}
                >
                  <XTerminal code={files["index.js"]} />
                </Panel>
              </>
            ) : null}
          </PanelGroup>
        </Panel>

        {isJs ? (
          <>
            <PanelResizeHandle />

            <Panel>
              <iframe ref={previewRef} className="h-full w-full"></iframe>
            </Panel>
          </>
        ) : null}
      </PanelGroup>
    </>
  );
}
