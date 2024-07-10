"use client"; // For client-side interaction with the router

import Link from "next/link";
import { FileDocument } from "@/models/File";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface FileCardProps {
  file: FileDocument;
  onDelete: (fileId: string) => Promise<void>; // Add onDelete prop
}

const FileCard = ({ file, onDelete }: FileCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpenChange = (open: boolean) => setIsOpen(open);

  return (
    <div className="bg-white rounded-md shadow-md p-4">
      <h3 className="text-lg font-semibold mb-2">{file.file_name}</h3>
      <p className="text-sm text-gray-600">Created {file.createdAt}</p>

      <div className="flex gap-2 mt-4">
        <Link href={`/editor/${file._id}`}>
          <Button variant="outline">Open</Button>
        </Link>
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
          <DialogTrigger asChild>
            <Button variant="destructive">Delete</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Are you sure absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your account and remove your data from our
                servers.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button type="button" onClick={() => handleOpenChange(false)} variant="outline">
                Cancel
              </Button>
              <Button type="submit" onClick={() => onDelete(file._id)} variant="destructive">
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default FileCard;