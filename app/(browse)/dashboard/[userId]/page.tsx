"use client";

import { currentUser } from "@clerk/nextjs/server";
import { redirect, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FileDocument } from "@/models/File";
import { useAuth } from "@clerk/nextjs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import FileCard from "@/app/(browse)/dashboard/[userId]/FileCard";

type FileProps = {
  file: FileDocument;
  onDelete: (fileId: string) => void;
};

export default function Page({ params }: { params: { userId: string } }) {
  const { userId } = params;
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [files, setFiles] = useState<FileDocument[]>([]);
  const [fileName, setFileName] = useState("");
  const [fileContent, setFileContent] = useState("");
  const handleOpenChange = (open: boolean) => setIsOpen(open);

  const clerkUser = useAuth();
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/files", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ file_content: fileContent, file_name: fileName }),
      });

      if (res.ok) {
        const newFile = await res.json();
        setFiles((prevFiles) => [...prevFiles, newFile]);
        setFileName("");
        setIsOpen(false);
        redirect(`/dashboard/${clerkUser.userId}`);
        // add toast message
      } else {
        // add toast message
        throw new Error("Failed to create new file");
      }
    } catch (error) {
      console.error("Error creating new file:", error);
    }
  };

  const onDelete = async (fileId: string) => {
    try {
      const res = await fetch(`/api/files?fileId=${fileId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setFiles(files.filter((file) => file._id !== fileId));
        console.log("File deleted");
        // add toast message
      } else {
        // add toast message
        throw new Error("Failed to delete file");
      }
    } catch (error) {
      console.error("Error deleting file:", error);
      // add toast message
    }
  };

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        if (!userId || !clerkUser) {
          router.push("/sign-in");
        }

        if (userId !== clerkUser.userId) {
          router.push(`/dashboard/${clerkUser.userId}`);
          // add toast message
          return;
        }

        const res = await fetch(`/api/files?userId=${clerkUser.userId}`);
        const data = await res.json();
        setFiles(data.files);
      } catch (error: any) {
        console.error("Error fetching files:", error);
        throw new Error("Error fetching files", error);
      }
    };

    fetchFiles();
  }, [isOpen]);

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">My Files</h1>
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>
          <Button>Create new File</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create File</DialogTitle>
            <DialogDescription>Create a new file</DialogDescription>
          </DialogHeader>
          <form onSubmit={onSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="file_name" className="text-right">
                  Name
                </label>
                <Input
                  id="file_name"
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Submit</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      {isLoading ? (
        <p>Loading files...</p>
      ) : files.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {files.map((file) => (
            <FileCard key={file._id} file={file as FileDocument} onDelete={onDelete} />
          ))}
        </div>
      ) : (
        <p>No files found.</p>
      )}
    </div>
  );
}