import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';

export interface AppError extends Error {
  status?: number;
}

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error(`PATH ${req.path}`, err);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
  });
};
