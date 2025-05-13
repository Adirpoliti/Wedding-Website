import express, { NextFunction, Request, Response } from 'express'
import { addPhoto } from '../logic/pictureLogic';
import { PhotoType } from 'models/PhotoModel';

const router = express.Router();

router.post('/photo/add', async (req: Request, res: Response, nextfunc: NextFunction) => {
    try {
        console.log(req.files?.photoFile)
        console.log(req.body)
        req.body.photoFile = req.files?.photoFile;
        console.log(req.body)
        const newPicutre = req.body as PhotoType
        const response = await addPhoto(newPicutre);

        res.status(200).json(response);
    } catch (error) {
        nextfunc(error);
    }
})

export default router;