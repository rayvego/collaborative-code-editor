"use client";

import { useRef, useState } from "react";
import { Editor } from "@monaco-editor/react";
import { CODE_SNIPPETS } from "@/lib/constants";
import { LanguageSelector } from "./lang-selector";
import { cn } from "@/lib/utils";
import Output from "@/app/(browse)/[username]/editor/_components/output";

export const CodeEditor = () => {
  // the useRef here serves two purposes:
  // 1. to store and pass the code written in the editor to the output component
  // 2. to focus on the editor when the page loads
  const editorRef = useRef<any>(null);

  // to store the code written in the editor
  const [value, setValue] = useState("");

  // to store the language selected by the user
  const [language, setLanguage] = useState("javascript");

  const onMount = (editor: any) => {
    editorRef.current = editor; // to get the code in the editor
    editor.focus(); // to focus on the editor when the page loads
  };

  const onSelect = (language: string) => {
    setLanguage(language);
    setValue(CODE_SNIPPETS[language]);
  };

  return (
    <div className="flex space-x-4">
      <div className="w-1/2">
        <LanguageSelector language={language} onSelect={onSelect} />

        <Editor
          className={cn("rounded-md", language === "python" && "python-editor-theme")} // Example of conditional styling
          // config options for the editor
          options={{ minimap: { enabled: false } }}
          height="75vh"
          theme="vs-dark"
          language={language}
          defaultValue={CODE_SNIPPETS[language]}
          onMount={onMount}
          value={value}
          onChange={(newValue) => setValue(newValue || "")}
        />
      </div>

      <Output editorRef={editorRef} language={language} />
    </div>
  );
};