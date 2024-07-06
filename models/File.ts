import mongoose, { Document, Model, Schema } from "mongoose";

export interface FileDocument extends Document {
  user_id: mongoose.Types.ObjectId;
  file_name: string;
  file_content: string;
  createdAt: Date;
  updatedAt: Date;
}

const FileSchema: Schema<FileDocument> = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  file_name: {
    type: String,
    required: true,
  },
  file_content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const File: Model<FileDocument> = mongoose.models.File || mongoose.model<FileDocument>("File", FileSchema);

export default File;