import { Response } from 'express';

export const ErrorResponse = (res: Response, status: number, data: unknown): Response => {
  return res.status(status).json({
    success: false,
    body: data,
  });
};

export const SuccessResponse = (res: Response, status: number, data: unknown): Response => {
  return res.status(status).json({
    success: true,
    body: data,
  });
};
