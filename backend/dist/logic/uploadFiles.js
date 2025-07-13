"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSignedUrlPromise = exports.uploadFiles = void 0;
const uuid_1 = require("uuid");
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const ErrorModel_1 = require("../models/ErrorModel");
const logger_1 = require("../utils/logger");
const s3 = new client_s3_1.S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});
const uploadFiles = async (file, path) => {
    try {
        logger_1.loggerData.log("info", `Trying to upload file: ${file.name}`);
        const extension = file.name.substring(file.name.lastIndexOf("."));
        const fileName = (0, uuid_1.v4)() + extension;
        const key = `${path}/${fileName}`;
        const command = new client_s3_1.PutObjectCommand({
            Bucket: process.env.AWS_S3_BUCKET,
            Key: key,
            Body: file.data,
            ContentType: file.mimetype,
            ContentDisposition: `attachment; filename="${file.name}"`,
            CacheControl: "no-cache, no-store, must-revalidate",
        });
        await s3.send(command);
        logger_1.loggerData.log("info", `Uploaded to: ${key}`);
        const url = `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
        return { path: key, url };
    }
    catch (err) {
        logger_1.loggerData.log("error", `S3 Upload Error: ${err.message}`);
        throw (0, ErrorModel_1.UnauthorizedError)("Failed to save file");
    }
};
exports.uploadFiles = uploadFiles;
const getSignedUrlPromise = async (filePath) => {
    try {
        const command = new client_s3_1.GetObjectCommand({
            Bucket: process.env.AWS_S3_BUCKET,
            Key: filePath
        });
        const url = await (0, s3_request_presigner_1.getSignedUrl)(s3, command, { expiresIn: 43200 });
        return url;
    }
    catch (err) {
        logger_1.loggerData.log("error", `Signed URL Error: ${err.message}`);
        throw err;
    }
};
exports.getSignedUrlPromise = getSignedUrlPromise;
