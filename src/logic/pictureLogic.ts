import { uploadFiles } from "./uploadFiles";
import { loggerData } from "utils/logger";
import { UnauthorizedError } from "models/ErrorModel";
import { PhotoType } from "models/PhotoModel";

export const addPhoto = async (photo: PhotoType): Promise<{ path: string; url: string }> => {
    try {
        const picture = photo.photoFile
        const path = "Photos";
        const savedFile = await uploadFiles(picture, path);
        if (!savedFile) throw new Error("File upload failed");
        return savedFile;
    }
    catch (err) {
        loggerData.log('info', `Err: ${err}`)
        return UnauthorizedError('Failed to save file');
    }
};

