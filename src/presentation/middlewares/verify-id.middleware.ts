import { Request, Response, NextFunction } from 'express';
import { ErrorResponse } from '../utils';

export async function verifyId(req: Request<{ id: string }>, res: Response, next: NextFunction) {
  const idToken = req.currentUser?.id;
  const idParams = req.params.id;

  if (idToken !== idParams)
    return ErrorResponse(
      res,
      403,
      'The entered id is incorrect, verify you are logged in correctly.'
    );

  return next();
}
