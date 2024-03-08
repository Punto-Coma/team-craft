import { Request, Response } from 'express';

export const ErrorResponse = (
  req: Request<unknown>,
  res: Response,
  status: number,
  data: unknown
): Response => {
  if (status === 500) req.logger.fatal({ data, status });

  req.logger.warn({ data, status });

  return res.status(status).json({
    success: false,
    body: data,
  });
};

export const SuccessResponse = (
  req: Request<unknown>,
  res: Response,
  status: number,
  data: unknown
): Response => {
  req.logger.info({ data, status });

  return res.status(status).json({
    success: true,
    body: data,
  });
};
