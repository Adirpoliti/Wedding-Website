import { UploadedFile } from "express-fileupload";
import { v4 as uuid } from "uuid";
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { UnauthorizedError } from "../models/ErrorModel";
import { loggerData } from "../utils/logger";

const s3 = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
  }
});

export const uploadFiles = async (file: UploadedFile, path: string) => {
  try {
    loggerData.log("info", `Trying to upload file: ${file.name}`);

    const extension = file.name.substring(file.name.lastIndexOf("."));
    const fileName = uuid() + extension;
    const key = `${path}/${fileName}`;

    const command = new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET!,
      Key: key,
      Body: file.data,
      ContentType: file.mimetype,
      ContentDisposition: `attachment; filename="${file.name}"`,
      CacheControl: "no-cache, no-store, must-revalidate",
    });

    await s3.send(command);
    loggerData.log("info", `Uploaded to: ${key}`);

    const url = `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;

    return { path: key, url };
  } catch (err: any) {
    loggerData.log("error", `S3 Upload Error: ${err.message}`);
    throw UnauthorizedError("Failed to save file");
  }
};

export const getSignedUrlPromise = async (filePath: string): Promise<string> => {
  try {
    const command = new GetObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET!,
      Key: filePath
    });

    const url = await getSignedUrl(s3, command, { expiresIn: 43200 }); 
    return url;
  } catch (err) {
    loggerData.log("error", `Signed URL Error: ${(err as any).message}`);
    throw err;
  }
};