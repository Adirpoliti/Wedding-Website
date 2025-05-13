import { Request, Response, NextFunction } from 'express';
import { loggerData } from '../utils/logger';

export const loggedRequest = (req: Request, res: Response, next: NextFunction) => {
  loggerData.log('info', `Request method: ${req.method}, Request route: ${req.originalUrl}`)
  next();
}   