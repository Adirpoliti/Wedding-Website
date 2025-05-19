import { Request, Response, NextFunction } from 'express';
import { verifyJwt } from '../utils/jwt';
import UserModel from '../models/User';
import { UnauthorizedError } from '../models/ErrorModel';

export const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) throw  UnauthorizedError('No token');

    const token = authHeader.split(' ')[1];
    const decoded = verifyJwt(token) as { userId: string };

    const user = await UserModel.findById(decoded.userId);
    if (!user) throw  UnauthorizedError('User not found');

    (req as any).user = user;
    next();
  } catch (err) {
    res.status(401).json({ error: (err as Error).message || 'Unauthorized' });
  }
};
