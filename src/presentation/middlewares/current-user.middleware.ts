import { NextFunction, Request, Response } from 'express';
import { Password, logger } from '../utils';
import { ITokenPayload } from '../interfaces/token-payload.interface';
import { Logger } from 'pino';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      currentUser?: ITokenPayload | null;
      logger: Logger;
    }
  }
}

export const currentUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.headers.authorization) {
      req.currentUser = null;
      req.logger = logger.child({ userID: null });
      return next();
    }
    const payload = Password.VerifyToken(req.headers.authorization!) as ITokenPayload;

    req.currentUser = payload;
    req.logger = logger.child({ userID: payload.id });

    return next();
  } catch (err) {
    return next(err);
  }
};
