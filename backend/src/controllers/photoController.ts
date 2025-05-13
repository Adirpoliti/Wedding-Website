import express, { NextFunction, Request, Response } from 'express'
import { addPhoto } from '../logic/pictureLogic';
import { PhotoType } from 'models/PhotoModel';

const router = express.Router();

router.post('/photo/add', async (req: Request, res: Response, nextfunc: NextFunction) => {
    try {
        console.log(req.files?.photoFile)
        const file = req.files?.photoFile;
        const newPicture: PhotoType = { ...req.body, photoFile: file };
        const response = await addPhoto(newPicture);

        res.status(200).json(response);
    } catch (error) {
        nextfunc(error);
    }
})

export default router;