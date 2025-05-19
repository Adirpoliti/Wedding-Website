import express, { NextFunction, Request, Response } from 'express'
import { addPhoto, deletePicture, getAllPictures } from '../logic/pictureLogic';
import { PhotoUploadInput } from 'models/PhotoModel';
import { checkAdmin } from 'middleware/checkAdmin';
import { requireAuth } from 'middleware/requiredAuth';

const router = express.Router();

router.post('/photo/add', async (req: Request, res: Response, nextfunc: NextFunction) => {
    try {
        console.log(req.files?.photoFile)
        const file = req.files?.photoFile;
        const newPicture: PhotoUploadInput = { ...req.body, photoFile: file };
        const response = await addPhoto(newPicture);

        res.status(200).json(response);
    } catch (error) {
        nextfunc(error);
    }
})

router.get('/photo/get', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await getAllPictures();
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