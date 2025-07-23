import { uploadFiles } from "./uploadFiles";
import { loggerData } from "../utils/logger";
import { PhotoModel, PhotosFromTheCanopyModel, PhotosFromThePastModel, PhotoUploadInput, SavedPhoto } from "../models/PhotoModel";
import { RequestTimeoutError, ResourceNotFoundError } from "../models/ErrorModel";

export const addPhoto = async (photo: PhotoUploadInput) => {
    try {
        const { uploaderId, eventName, photoFile } = photo;
        const path = "Photos";

        const s3Result = await uploadFiles(photoFile, path);
        if (!s3Result) throw new Error("File upload failed");

        const saved = await PhotoModel.create({
            uploaderId,
            eventName,
            originalUrl: s3Result.original.url,
            compressedUrl: s3Result.compressed?.url || null,
            type: photoFile.mimetype.startsWith("video/") ? "video" : "image",
            fileName: photoFile.name,
            mimeType: photoFile.mimetype,
            size: photoFile.size,
        });

        return saved;
    } catch (err: any) {
        loggerData.log("error", `Err: ${err?.message || err}`);
        throw new Error("Failed to save photo");
    }
};



export const deletePicture = async (_id: string) => {
    try {
        const findPicture = await PhotoModel.findOne({ _id });

        if (!findPicture) {
            throw ResourceNotFoundError(`Failed to find the picture with id: ${_id}!`);
        }

        await findPicture.deleteOne();
    } catch (error) {
        throw ResourceNotFoundError(`Failed to delete the picture with id: ${_id}!`);
    }
};

export const getAllPictures = async () => {
    try {
        const pictures = await PhotoModel.find() as SavedPhoto[];
        return pictures;
    } catch (error) {
        RequestTimeoutError('Failed to fetch the picture!');
    }
}

export const getAllPicturesFromThePast = async () => {
    try {
        const pictures = await PhotosFromThePastModel.find() as SavedPhoto[];
        return pictures;
    } catch (error) {
        RequestTimeoutError('Failed to fetch the picture!');
    }
}

export const getAllPicturesFromTheCanopy = async () => {
    try {
        const pictures = await PhotosFromTheCanopyModel.find() as SavedPhoto[];
        return pictures;
    } catch (error) {
        RequestTimeoutError('Failed to fetch the picture!');
    }
}