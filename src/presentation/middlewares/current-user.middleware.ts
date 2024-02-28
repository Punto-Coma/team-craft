import { NextFunction, Request, Response } from 'express';
import { Password } from '../utils';
import { ITokenPayload } from '../interfaces/token-payload.interface';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      currentUser?: ITokenPayload | null;
    }
  }
}

export const currentUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.headers.authorization) {
      req.currentUser = null;
      next();
    }
    const payload = Password.VerifyToken(req.headers.authorization!) as ITokenPayload;

    req.currentUser = payload;
  } catch (err) {
    next(err);
  }

  next();
};
