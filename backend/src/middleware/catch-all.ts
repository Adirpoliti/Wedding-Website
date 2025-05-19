import { Request, Response, NextFunction } from 'express';

export const catchAll = (err: any, req: Request, res: Response, next: NextFunction) => {
  try {
    const status = typeof err.status === 'number' && err.status >= 100 && err.status <= 599
      ? err.status
      : 500;

    res.status(status).json({
      message: err.message || 'Internal server error',
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    });
  } catch (innerErr) {
    res.status(500).json({
      message: 'Something went really wrong in error handler.',
    });
  }
};
