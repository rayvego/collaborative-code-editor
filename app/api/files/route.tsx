import { currentUser } from "@clerk/nextjs/server";
import connectToDatabase from "@/lib/mongoose";
import File from "@/models/File";
import { Simulate } from "react-dom/test-utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url as string);
  const userId = searchParams.get("userId");
  const clerkUser = await currentUser();

  if (!userId || !clerkUser) {
    return NextResponse.json({ error: "Missing credentials" }, { status: 400 });
  }

  if (userId !== clerkUser.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 500 });
  }

  // now make a query to the database to get the files
  try {
    await connectToDatabase();
    const files = await File.find({ externalUserId: userId });
    return NextResponse.json({ files }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const user = await currentUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectToDatabase();
    const { file_name, file_content } = await req.json();
    console.log("HERE, file_name, file_content: ", file_name, file_content);

    const file = await File.create({
      externalUserId: user.id,
      file_name,
      file_content,
    });

    return NextResponse.json({ file }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create new file." }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const user = await currentUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectToDatabase();
    const fileId = req.nextUrl.searchParams.get("fileId");

    if (!fileId) {
      return NextResponse.json({ error: "Missing fileId" }, { status: 400 });
    }

    const file = await File.findById(fileId);

    if (!file) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    if (file.externalUserId !== user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await file.deleteOne();

    return NextResponse.json({ message: "File deleted" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting file:", error);
    return NextResponse.json({ error: "Failed to delete file" }, { status: 500 });
  }
}