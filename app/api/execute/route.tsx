import { NextRequest, NextResponse } from "next/server";
import { LANGUAGE_VERSIONS } from "@/lib/constants";

export async function POST(req: NextRequest) {
  const { language, sourceCode } = await req.json();

  try {
    const response = await fetch("https://emkc.org/api/v2/piston/execute", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        language,
        version: LANGUAGE_VERSIONS[language],
        files: [{ content: sourceCode }],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "External API error");
    }

    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Code execution error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 }); // Internal Server Error
  }
}