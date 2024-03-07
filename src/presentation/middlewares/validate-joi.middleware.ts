import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { ErrorResponse } from '../utils';

interface DTO {
  [key: string]: unknown;
}

export function validateInputData<T extends DTO>(
  bodySchema?: Joi.ObjectSchema<T>,
  querySchema?: Joi.ObjectSchema<T>
) {
  return (req: Request<object, object, T>, res: Response, next: NextFunction) => {
    const inputData: T = req.body;

    if (bodySchema) {
      const { error: bodyError } = bodySchema.validate(inputData, { abortEarly: false });

      if (bodyError) {
        const errorMessages: string[] = bodyError.details.map((detail) =>
          detail.message.replace(/["\\]/g, '')
        );
        return ErrorResponse(res, 400, errorMessages);
      }
    }

    if (querySchema) {
      const { error: queryError, value } = querySchema.validate(req.query, {
        convert: true,
        stripUnknown: true,
      });

      if (queryError) {
        const queryErrorMessages: string[] = queryError.details.map((detail) =>
          detail.message.replace(/["\\]/g, '')
        );
        return ErrorResponse(res, 400, queryErrorMessages);
      }

      req.query = value as never;
    }

    req.body = inputData;

    return next();
  };
}
