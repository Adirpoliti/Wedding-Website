import { UploadedFile } from "express-fileupload";
import { ObjectId } from "mongodb";

export type PhotoType = {
  _id: ObjectId;
  photoFile: UploadedFile,
  photoUrl: string
}