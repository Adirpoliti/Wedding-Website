import { uploadFiles } from "./uploadFiles";
import { loggerData } from "../utils/logger";
import { PhotoModel, PhotosFromThePastModel, PhotoUploadInput, SavedPhoto } from "../models/PhotoModel";
import { RequestTimeoutError, ResourceNotFoundError } from "../models/ErrorModel";

export const addPhoto = async (photo: PhotoUploadInput) => {
    try {
        const { uploaderId, eventName, photoFile } = photo;
        const path = "PhotosFromThePast";

        const s3Result = await uploadFiles(photoFile, path);
        if (!s3Result) throw new Error("File upload failed");

        const saved = await PhotosFromThePastModel.create({
            uploaderId,
            eventName,
            photoUrl: s3Result.url,
            fileName: photoFile.name,
            mimeType: photoFile.mimetype,
            size: photoFile.size
        });

        return saved;
    } catch (err: any) {
        loggerData.log('error', `Err: ${err?.message || err}`);
        throw new Error('Failed to save file');
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

export const getPhotosByIds = async (photoIds: string[]) => {
    try {
        const photos = await PhotoModel.find({ _id: { $in: photoIds } })
            .select("photoUrl fileName")
            .lean();

        return photos.map(photo => {
            const url = photo.photoUrl;
            const fileName = photo.fileName ?? (url ? url.split("/").pop() : "file.jpg");

            return {
                url,
                name: fileName
            };
        });

    } catch (error) {
        loggerData.log('error', `Failed to get photos by IDs: ${error}`);
        throw new Error("Failed to get photo data for zip download");
    }
};