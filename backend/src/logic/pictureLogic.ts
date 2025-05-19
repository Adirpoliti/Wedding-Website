import { uploadFiles } from "./uploadFiles";
import { loggerData } from "utils/logger";
import { PhotoModel, PhotoUploadInput, SavedPhoto } from "models/PhotoModel";
import { RequestTimeoutError, ResourceNotFoundError } from "models/ErrorModel";

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

export const deletePicture = async (_id: string) => {
    try {
        const findPicture = await PhotoModel.findOne({ _id: _id }) as SavedPhoto
        if (!findPicture) ResourceNotFoundError(`Failed to find the Product with id: ${_id}!`)
        const pictureId = findPicture._id;
        await findPicture.deleteOne({ pictureId })
    } catch (error) {
        ResourceNotFoundError(`Failed to find the vacation with id: ${_id}!`);
    }
}

export const getAllPictures = async () => {
    try {
        const pictures = await PhotoModel.find() as SavedPhoto[];
        return pictures;
    } catch (error) {
        RequestTimeoutError('Failed to fetch the Products!');
    }
}