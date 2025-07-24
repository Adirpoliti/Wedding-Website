import { UploadedFile } from "express-fileupload";
import { v4 as uuid } from "uuid";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { loggerData } from "../utils/logger";
import sharp from "sharp";
import { NodeHttpHandler } from "@smithy/node-http-handler";
import { Agent } from "https";

const s3 = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
  requestHandler: new NodeHttpHandler({
    connectionTimeout: 5000,
    socketTimeout: 30000,
    httpsAgent: new Agent({ maxSockets: 400 }),
  }),
});

export const uploadFiles = async (file: UploadedFile, path: string) => {
  try {
    loggerData.log("info", `Trying to upload file: ${file.name}`);

    const extension = file.name.substring(file.name.lastIndexOf("."));
    const baseName = uuid();
    const originalKey = `${path}/${baseName}${extension}`;

    const originalCommand = new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET!,
      Key: originalKey,
      Body: file.data,
      ContentType: file.mimetype,
      ContentDisposition: `attachment; filename="${file.name}"`,
    });

    await s3.send(originalCommand);
    loggerData.log("info", `Uploaded original to: ${originalKey}`);

    const baseUrl = `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com`;

    const result: {
      original: { key: string; url: string };
      compressed?: { key: string; url: string };
    } = {
      original: { key: originalKey, url: `${baseUrl}/${originalKey}` },
    };

    if (file.mimetype.startsWith("image/")) {
      const compressedKey = `${path}/${baseName}_compressed.webp`;

      const compressedBuffer = await sharp(file.data)
        .rotate(90)
        .resize({ width: 1280 })
        .webp({ quality: 75 })
        .toBuffer();

      const compressedCommand = new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET!,
        Key: compressedKey,
        Body: compressedBuffer,
        ContentType: "image/webp",
        ContentDisposition: `inline; filename="${baseName}_compressed.webp"`,
      });

      await s3.send(compressedCommand);
      loggerData.log("info", `Uploaded compressed to: ${compressedKey}`);

      result.compressed = {
        key: compressedKey,
        url: `${baseUrl}/${compressedKey}`,
      };
    }

    return result;
  } catch (err: any) {
    loggerData.log("error", "Upload failed: " + err.message);
    throw err;
  }
};
