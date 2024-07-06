import React, { useState } from "react";
import { Button } from "@/components/ui/button";
// import { useToast } from "@/components/ui/use-toast";

interface OutputProps {
  editorRef: React.RefObject<any>;
  language: string;
}

const Output: React.FC<OutputProps> = ({ editorRef, language }) => {
  // const { toast } = useToast();
  const [output, setOutput] = useState<string[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const runCode = async () => {
    // we get the code in the editor using refs... we had set the ref in the code editor component
    const sourceCode = editorRef.current?.getValue();
    if (!sourceCode) return;

    try {
      // sending the code to the server to execute
      // (this is how to make a POST request in Next.js through another file)
      const response = await fetch("/api/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // the execute API expects the language and source code
        body: JSON.stringify({ language, sourceCode }),
      });

      if (!response.ok) {
        throw new Error("Failed to execute code");
      }
      // console.log(response);

      const { run: result } = await response.json();

      setOutput(result.output.split("\n"));

      result.stderr ? setIsError(true) : setIsError(false);
    } catch (error) {
      console.error(error);
      // toast({
      //   title: "An error occurred.",
      //   description: "Unable to run code. Please try again.",
      //   variant: "destructive",
      // });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-1/2">
      <h2 className="text-lg mb-2">Output</h2>
      <Button onClick={runCode} className="mb-4">
        Run Code
      </Button>
      <div
        className={`h-[75vh] p-2 border rounded-md break-words ${
          isError ? "border-red-500 text-red-400" : "border-gray-600" // Conditional border and text color
        }`}
      >
        {output ? output.map((line, i) => <p key={i}>{line}</p>) : 'Click "Run Code" to see the output here'}
      </div>
    </div>
  );
};

export default Output;