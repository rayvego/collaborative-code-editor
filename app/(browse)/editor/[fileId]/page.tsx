import { CodeEditor } from "./_components/code-editor";
import connectToDatabase from "@/lib/mongoose";
import { FileDocument } from "@/models/File";
import File from "@/models/File";
import { currentUser } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";

async function getFileData(fileId: string) {
  try {
    await connectToDatabase();
    const file = (await File.findById(fileId)) as FileDocument | null;
    return file;
  } catch (error: any) {
    console.log("Error getting file data: ", error.message);
    return null;
  }
}

export default async function Page({ params }: { params: { fileId: string } }) {
  const clerkUser = await currentUser();

  if (!clerkUser) {
    redirect("/sign-in");
    return null;
  }

  const file = await getFileData(params.fileId);

  if (!file) {
    notFound();
    return null;
  }

  if (file.externalUserId !== clerkUser.id) {
    notFound();
    return null;
  }

  return (
    // <main className="flex min-h-screen w-full flex-col items-center justify-evenly p-20">
    <CodeEditor code={file.file_content} fileId={params.fileId} />
    // </main>
  );
}