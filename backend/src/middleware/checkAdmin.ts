import { Request, Response, NextFunction } from 'express';

export const checkAdmin = (req: Request, res: Response, next: NextFunction): void => {
  const user = (req as any).user;

  if (!user) {
    res.status(401).json({ message: 'Unauthorized: no user found' });
    return;
  }

  if (user.role !== 'Admin') {
    res.status(403).json({ message: 'Access denied: Admins only' });
    return;
  }

  next();
};