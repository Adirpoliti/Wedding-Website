import { Request, Response } from 'express';
import { createJwtForUser } from '../logic/authLogic';

export const googleCallback = async (req: Request, res: Response): Promise<void> => {
    if (!req.user) {
        res.status(401).json({ message: 'Google login failed' });
        return
    }

    // @ts-ignore
    const token = createJwtForUser(req.user._id.toString());

    res.json({ token });
};