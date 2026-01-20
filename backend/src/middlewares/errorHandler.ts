import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from '@constants/http.js';
import AppError from '@utils/AppError.js';
import { clearCookies, REFRESH_PATH } from '@utils/cookies.js';
import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import z from 'zod';

const handleZodError = (res: Response, error: z.ZodError) => {
  const errors = error.issues.map((err) => ({
    path: err.path.join('.'),
    message: err.message,
  }));
  return res.status(BAD_REQUEST).json(errors);
};
const handleAppError = (res: Response, error: AppError) => {
  return res.status(error.statusCode).json({
    message: error.message,
    errorCode: error.errorCode,
  });
};
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error(`PATH ${req.path}`, err);

  if (req.path === REFRESH_PATH) clearCookies(res);

  if (err instanceof z.ZodError) return handleZodError(res, err);

  if (err instanceof AppError) return handleAppError(res, err);

  return res.status(INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
};

export default errorHandler;
