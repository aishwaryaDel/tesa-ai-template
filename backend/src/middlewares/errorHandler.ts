import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError';
import { APP_CONFIG } from '../config';

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      error: err.message,
      ...(APP_CONFIG.NODE_ENV === 'development' && { stack: err.stack }),
    });
    return;
  }

  console.error('Unhandled error:', err);

  res.status(500).json({
    success: false,
    error: 'Internal server error',
    ...(APP_CONFIG.NODE_ENV === 'development' && { stack: err.stack }),
  });
};
