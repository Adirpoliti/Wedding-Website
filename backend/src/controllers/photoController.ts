import express, { NextFunction, Request, Response } from 'express'
import { addPhoto, deletePicture, getAllPictures, getAllPicturesFromTheCanopy, getAllPicturesFromThePast } from '../logic/pictureLogic';
import { PhotoUploadInput } from '../models/PhotoModel';
import { checkAdmin } from '../middleware/checkAdmin';
import { requireAuth } from '../middleware/requiredAuth';
import { UploadedFile } from 'express-fileupload';


const router = express.Router();

router.post('/photo/add', async (req: Request, res: Response, nextfunc: NextFunction) => {
  try {
    const { uploaderId, eventName } = req.body;

    if (!req.files) {
      throw new Error("No files uploaded.");
    }

    const uploadedItems: UploadedFile[] = [];

    const processInput = (input: UploadedFile | UploadedFile[] | undefined) => {
      if (!input) return;
      if (Array.isArray(input)) {
        uploadedItems.push(...input);
      } else {
        uploadedItems.push(input);
      }
    };

    processInput(req.files.photoFile);
    processInput(req.files.videoFile);

    if (uploadedItems.length === 0) {
      throw new Error("No valid files found in request.");
    }

    const allUploads = await Promise.all(
      uploadedItems.map(file => {
        const newUpload = {
          uploaderId,
          eventName,
          photoFile: file,
        };
        return addPhoto(newUpload);
      })
    );

    res.status(200).json(allUploads);
  } catch (error) {
    nextfunc(error);
  }
});

router.get('/photo/get', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await getAllPictures();
        res.json(response);
    } catch (err) {
        next(err);
    }
});

router.get('/photosFromThePast/get', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await getAllPicturesFromThePast();
        res.json(response);
    } catch (err) {
        next(err);
    }
});

router.get('/photosFromTheCanopy/get', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await getAllPicturesFromTheCanopy();
        res.json(response);
    } catch (err) {
        next(err);
    }
});

router.delete('/photo/delete/:id', requireAuth, checkAdmin, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id
        await deletePicture(id);
        res.sendStatus(204)
    } catch (err) {
        next(err);
    }
});

export default router;