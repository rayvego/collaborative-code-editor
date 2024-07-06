import { NextRequest, NextResponse } from "next/server";
import { LANGUAGE_VERSIONS } from "@/lib/constants.js"; // Assuming constants are in the app directory

export async function POST(req: NextRequest) {
  const { language, sourceCode } = await req.json();

  try {
    const response = await fetch("https://emkc.org/api/v2/piston/execute", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        language,
        version: LANGUAGE_VERSIONS[language],
        files: [{ content: sourceCode }],
      }),
    });

    const data = await response.json(); // Parse the response data
    return NextResponse.json(data); // Return the parsed data
  } catch (error: any) {
    console.error("Error executing code:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}