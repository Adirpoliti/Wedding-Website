"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFiles = void 0;
const uuid_1 = require("uuid");
const client_s3_1 = require("@aws-sdk/client-s3");
const logger_1 = require("../utils/logger");
const sharp_1 = __importDefault(require("sharp"));
const node_http_handler_1 = require("@smithy/node-http-handler");
const https_1 = require("https");
const exif = require("exif-parser");
const s3 = new client_s3_1.S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
    requestHandler: new node_http_handler_1.NodeHttpHandler({
        connectionTimeout: 5000,
        socketTimeout: 30000,
        httpsAgent: new https_1.Agent({ maxSockets: 400 }),
    }),
});
const uploadFiles = async (file, path) => {
    try {
        logger_1.loggerData.log("info", `Trying to upload file: ${file.name}`);
        const extension = file.name.substring(file.name.lastIndexOf("."));
        const baseName = (0, uuid_1.v4)();
        const originalKey = `${path}/${baseName}${extension}`;
        const originalCommand = new client_s3_1.PutObjectCommand({
            Bucket: process.env.AWS_S3_BUCKET,
            Key: originalKey,
            Body: file.data,
            ContentType: file.mimetype,
            ContentDisposition: `attachment; filename="${file.name}"`,
        });
        await s3.send(originalCommand);
        logger_1.loggerData.log("info", `Uploaded original to: ${originalKey}`);
        const baseUrl = `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com`;
        const result = {
            original: { key: originalKey, url: `${baseUrl}/${originalKey}` },
        };
        if (file.mimetype.startsWith("image/")) {
            // 📷 STEP 1: Check EXIF orientation
            let orientation;
            try {
                const parser = exif.create(file.data);
                const parsed = parser.parse();
                orientation = parsed.tags.Orientation;
                console.log("📷 EXIF Orientation:", orientation);
            }
            catch (err) {
                console.log("❌ Failed to parse EXIF:", err);
            }
            // 📦 STEP 2: Decide how to rotate using EXIF
            let sharpInstance = (0, sharp_1.default)(file.data);
            switch (orientation) {
                case 3:
                    sharpInstance = sharpInstance.rotate(180);
                    break;
                case 6:
                    sharpInstance = sharpInstance.rotate(90);
                    break;
                case 8:
                    sharpInstance = sharpInstance.rotate(270);
                    break;
                default:
                    sharpInstance = sharpInstance.rotate(); // fallback to Sharp's default
                    break;
            }
            // 📦 STEP 3: Resize and compress
            const compressedKey = `${path}/${baseName}_compressed.webp`;
            const compressedBuffer = await sharpInstance
                .resize({ width: 1280 })
                .webp({ quality: 75 })
                .toBuffer();
            const compressedCommand = new client_s3_1.PutObjectCommand({
                Bucket: process.env.AWS_S3_BUCKET,
                Key: compressedKey,
                Body: compressedBuffer,
                ContentType: "image/webp",
                ContentDisposition: `inline; filename="${baseName}_compressed.webp"`,
            });
            await s3.send(compressedCommand);
            logger_1.loggerData.log("info", `Uploaded compressed to: ${compressedKey}`);
            result.compressed = {
                key: compressedKey,
                url: `${baseUrl}/${compressedKey}`,
            };
        }
        return result;
    }
    catch (err) {
        logger_1.loggerData.log("error", "Upload failed: " + err.message);
        throw err;
    }
};
exports.uploadFiles = uploadFiles;
