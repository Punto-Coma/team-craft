import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { ErrorResponse } from '../utils';

interface DTO {
  [key: string]: unknown;
}

export function validateInputData<T extends DTO>(schema: Joi.ObjectSchema<T>) {
  return (req: Request<object, object, T>, res: Response, next: NextFunction) => {
    const inputData: T = req.body;

    const { error } = schema.validate(inputData, { abortEarly: false });

    if (error) {
      const errorMessages: string[] = error.details.map((detail) =>
        detail.message.replace(/["\\]/g, '')
      );
      return ErrorResponse(res, 400, errorMessages);
    }

    next();
  };
}
