import express, { NextFunction, Request, Response } from 'express'
import { addPhoto, deletePicture, getAllPictures, getAllPicturesFromThePast } from '../logic/pictureLogic';
import { PhotoUploadInput } from '../models/PhotoModel';
import { checkAdmin } from '../middleware/checkAdmin';
import { requireAuth } from '../middleware/requiredAuth';


const router = express.Router();

router.post('/photo/add', async (req: Request, res: Response, nextfunc: NextFunction) => {
  try {
    const files = req.files?.photoFile;
    const { uploaderId, eventName } = req.body;

    if (!files || !Array.isArray(files)) {
      throw new Error("No files uploaded or invalid format");
    }

    const allUploads = await Promise.all(
      files.map(file => {
        const newPicture: PhotoUploadInput = {
          uploaderId,
          eventName,
          photoFile: file
        };
        return addPhoto(newPicture);
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