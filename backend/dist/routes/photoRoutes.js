"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const archiver_1 = __importDefault(require("archiver"));
const axios_1 = __importDefault(require("axios"));
const PhotoModel_1 = require("../models/PhotoModel");
const router = express_1.default.Router();
router.post("/photo/download-zip", async (req, res, next) => {
    try {
        const { photoIds } = req.body;
        if (!Array.isArray(photoIds) || photoIds.length === 0) {
            res.status(400).json({ message: "No photo IDs provided" });
            return;
        }
        const [photos1, photos2, photos3] = await Promise.all([
            PhotoModel_1.PhotoModel.find({ _id: { $in: photoIds } })
                .select("originalUrl fileName")
                .lean(),
            PhotoModel_1.PhotosFromThePastModel.find({ _id: { $in: photoIds } })
                .select("originalUrl fileName")
                .lean(),
            PhotoModel_1.PhotosFromTheCanopyModel.find({ _id: { $in: photoIds } })
                .select("originalUrl fileName")
                .lean(),
        ]);
        const allPhotos = [...photos1, ...photos2, ...photos3];
        const archive = (0, archiver_1.default)("zip", { zlib: { level: 9 } });
        res.setHeader("Content-Type", "application/zip");
        res.setHeader("Content-Disposition", "attachment; filename=photos.zip");
        archive.on("error", (err) => next(err));
        archive.pipe(res);
        await Promise.all(allPhotos.map(async (photo) => {
            try {
                const url = photo.originalUrl;
                if (!url)
                    return;
                const response = await axios_1.default.get(url, { responseType: "stream" });
                const fileName = photo.fileName ?? url.split("/").pop() ?? "file.jpg";
                archive.append(response.data, { name: fileName });
            }
            catch (err) {
                console.warn(`Failed to fetch file: ${photo.originalUrl}`, err);
            }
        }));
        archive.finalize();
    }
    catch (error) {
        next(error);
    }
});
exports.default = router;
