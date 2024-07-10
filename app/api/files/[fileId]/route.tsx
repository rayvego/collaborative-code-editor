import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import connectToDatabase from "@/lib/mongoose";
import File from "@/models/File";

export async function PUT(req: NextRequest, { params }: { params: { fileId: string } }) {
  const user = await currentUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectToDatabase();
    const fileId = params.fileId;
    const { code } = await req.json();

    if (!code) {
      return NextResponse.json({ error: "File cannot be empty" }, { status: 400 });
    }

    const file = await File.findById(fileId);

    if (!file) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    if (file.externalUserId !== user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    file.file_content = code;
    file.updatedAt = new Date();
    await file.save();

    return NextResponse.json({ message: "File updated successfully" }, { status: 200 });
  } catch (error: any) {
    console.error("Error updating file:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}