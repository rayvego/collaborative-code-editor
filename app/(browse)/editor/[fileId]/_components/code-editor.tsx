"use client";

import { useRef, useState } from "react";
import { Editor } from "@monaco-editor/react";
import { CODE_SNIPPETS } from "@/lib/constants";
import { LanguageSelector } from "./lang-selector";
import { cn } from "@/lib/utils";
import Output from "./output";
import { Button } from "@/components/ui/button";

interface CodeEditorProps {
  code: string;
  fileId: string;
}

export const CodeEditor = ({ code, fileId }: CodeEditorProps) => {
  /**
   * the useRef here serves two purposes:
   * 1. to store and pass the code written in the editor to the output component
   * 2. to focus on the editor when the page loads
   */
  const editorRef = useRef<any>();

  // to store the code written in the editor
  const [value, setValue] = useState("");

  // to store the language selected by the user
  const [language, setLanguage] = useState("javascript");

  const onMount = (editor: any) => {
    editorRef.current = editor; // to get the code written in the editor
    editor.setValue(code || "");
    editor.focus(); // to focus on the editor when the page loads
  };

  const onSelect = (language: string) => {
    setLanguage(language);
    setValue(CODE_SNIPPETS[language]);
  };

  const handleSave = async () => {
    try {
      const newCode = editorRef.current.getValue();
      const res = await fetch(`/api/files/${fileId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: newCode }),
      });

      if (res.ok) {
        // add toast message
        console.log("File updated successfully");
      } else {
        // add toast message
        console.log("File could not be saved");
      }
    } catch (error) {
      console.error("Error updating file:", error);
      // add toast message
    }
  };

  return (
    <div className="flex space-x-4 p-5">
      <div className="w-1/2">
        <div className={"flex flex-row justify-between"}>
          <LanguageSelector language={language} onSelect={onSelect} />
          <Button className={"mt-5"} onClick={handleSave}>
            Save
          </Button>
        </div>

        <Editor
          className={cn("rounded-xl", language === "python" && "python-editor-theme")}
          // config options for the editor
          options={{ minimap: { enabled: true } }}
          height="75vh"
          theme="vs-light"
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