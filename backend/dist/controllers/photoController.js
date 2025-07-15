"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pictureLogic_1 = require("../logic/pictureLogic");
const checkAdmin_1 = require("../middleware/checkAdmin");
const requiredAuth_1 = require("../middleware/requiredAuth");
const router = express_1.default.Router();
router.post('/photo/add', async (req, res, nextfunc) => {
    try {
        const { uploaderId, eventName } = req.body;
        if (!req.files) {
            throw new Error("No files uploaded.");
        }
        const uploadedItems = [];
        const processInput = (input) => {
            if (!input)
                return;
            if (Array.isArray(input)) {
                uploadedItems.push(...input);
            }
            else {
                uploadedItems.push(input);
            }
        };
        processInput(req.files.photoFile);
        processInput(req.files.videoFile);
        if (uploadedItems.length === 0) {
            throw new Error("No valid files found in request.");
        }
        const allUploads = await Promise.all(uploadedItems.map(file => {
            const newUpload = {
                uploaderId,
                eventName,
                photoFile: file,
            };
            return (0, pictureLogic_1.addPhoto)(newUpload);
        }));
        res.status(200).json(allUploads);
    }
    catch (error) {
        nextfunc(error);
    }
});
router.get('/photo/get', async (req, res, next) => {
    try {
        const response = await (0, pictureLogic_1.getAllPictures)();
        res.json(response);
    }
    catch (err) {
        next(err);
    }
});
router.get('/photosFromThePast/get', async (req, res, next) => {
    try {
        const response = await (0, pictureLogic_1.getAllPicturesFromThePast)();
        res.json(response);
    }
    catch (err) {
        next(err);
    }
});
router.get('/photosFromTheCanopy/get', async (req, res, next) => {
    try {
        const response = await (0, pictureLogic_1.getAllPicturesFromTheCanopy)();
        res.json(response);
    }
    catch (err) {
        next(err);
    }
});
router.delete('/photo/delete/:id', requiredAuth_1.requireAuth, checkAdmin_1.checkAdmin, async (req, res, next) => {
    try {
        const id = req.params.id;
        await (0, pictureLogic_1.deletePicture)(id);
        res.sendStatus(204);
    }
    catch (err) {
        next(err);
    }
});
exports.default = router;
