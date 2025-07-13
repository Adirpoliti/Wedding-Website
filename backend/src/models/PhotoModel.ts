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
  deleteOne(arg0: { pictureId: ObjectId; }): unknown;
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
export const PhotosFromThePastModel = mongoose.model('PhotosFromThePast', photoSchema);
export const PhotosFromTheCanopyModel = mongoose.model('PhotosFromTheCanopy', photoSchema);