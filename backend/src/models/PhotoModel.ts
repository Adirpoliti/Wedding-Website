import { UploadedFile } from "express-fileupload";
import { ObjectId } from "mongodb";
import mongoose, { Schema } from 'mongoose';

export type PhotoUploadInput = {
  uploaderId: string;
  eventName: string;
  photoFile: UploadedFile;
};

export type SavedPhoto = {
  _id?: ObjectId;
  uploaderId: string;
  eventName: string;
  photoUrl: string;
  fileName: string;
  mimeType: string;
  size: number;
};

const photoSchema = new Schema({
  uploaderId: String,
  eventName: String,
  photoUrl: String,
  fileName: String,
  mimeType: String,
  size: Number,
}, { timestamps: true });

export const PhotoModel = mongoose.model('Photo', photoSchema);