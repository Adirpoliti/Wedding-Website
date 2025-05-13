import { uploadFiles } from "./uploadFiles";
import { loggerData } from "utils/logger";
import { PhotoModel, PhotoUploadInput } from "models/PhotoModel";

export const addPhoto = async (photo: PhotoUploadInput) => {
    try {
        const { uploaderId, eventName, photoFile } = photo;
        const path = "Photos";

        const s3Result = await uploadFiles(photoFile, path);
        if (!s3Result) throw new Error("File upload failed");

        const saved = await PhotoModel.create({
            uploaderId,
            eventName,
            photoUrl: s3Result.url,
            fileName: photoFile.name,
            mimeType: photoFile.mimetype,
            size: photoFile.size
        });

        return saved;
    } catch (err) {
        loggerData.log('error', `Err: ${err}`);
        throw new Error('Failed to save file');
    }
};
