"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPhotosByIds = exports.getAllPicturesFromTheCanopy = exports.getAllPicturesFromThePast = exports.getAllPictures = exports.deletePicture = exports.addPhoto = void 0;
const uploadFiles_1 = require("./uploadFiles");
const logger_1 = require("../utils/logger");
const PhotoModel_1 = require("../models/PhotoModel");
const ErrorModel_1 = require("../models/ErrorModel");
const addPhoto = async (photo) => {
    try {
        const { uploaderId, eventName, photoFile } = photo;
        const path = "PhotosFromTheCanopy";
        const s3Result = await (0, uploadFiles_1.uploadFiles)(photoFile, path);
        if (!s3Result)
            throw new Error("File upload failed");
        const saved = await PhotoModel_1.PhotoModel.create({
            uploaderId,
            eventName,
            photoUrl: s3Result.url,
            fileName: photoFile.name,
            mimeType: photoFile.mimetype,
            size: photoFile.size
        });
        return saved;
    }
    catch (err) {
        logger_1.loggerData.log('error', `Err: ${err?.message || err}`);
        throw new Error('Failed to save file');
    }
};
exports.addPhoto = addPhoto;
const deletePicture = async (_id) => {
    try {
        const findPicture = await PhotoModel_1.PhotoModel.findOne({ _id });
        if (!findPicture) {
            throw (0, ErrorModel_1.ResourceNotFoundError)(`Failed to find the picture with id: ${_id}!`);
        }
        await findPicture.deleteOne();
    }
    catch (error) {
        throw (0, ErrorModel_1.ResourceNotFoundError)(`Failed to delete the picture with id: ${_id}!`);
    }
};
exports.deletePicture = deletePicture;
const getAllPictures = async () => {
    try {
        const pictures = await PhotoModel_1.PhotoModel.find();
        return pictures;
    }
    catch (error) {
        (0, ErrorModel_1.RequestTimeoutError)('Failed to fetch the picture!');
    }
};
exports.getAllPictures = getAllPictures;
const getAllPicturesFromThePast = async () => {
    try {
        const pictures = await PhotoModel_1.PhotosFromThePastModel.find();
        return pictures;
    }
    catch (error) {
        (0, ErrorModel_1.RequestTimeoutError)('Failed to fetch the picture!');
    }
};
exports.getAllPicturesFromThePast = getAllPicturesFromThePast;
const getAllPicturesFromTheCanopy = async () => {
    try {
        const pictures = await PhotoModel_1.PhotosFromTheCanopyModel.find();
        return pictures;
    }
    catch (error) {
        (0, ErrorModel_1.RequestTimeoutError)('Failed to fetch the picture!');
    }
};
exports.getAllPicturesFromTheCanopy = getAllPicturesFromTheCanopy;
const getPhotosByIds = async (photoIds) => {
    try {
        const photos = await PhotoModel_1.PhotoModel.find({ _id: { $in: photoIds } })
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
    }
    catch (error) {
        logger_1.loggerData.log('error', `Failed to get photos by IDs: ${error}`);
        throw new Error("Failed to get photo data for zip download");
    }
};
exports.getPhotosByIds = getPhotosByIds;
