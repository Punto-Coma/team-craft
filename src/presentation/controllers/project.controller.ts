import { Response } from 'express';
import { CustomError, ErrorResponse } from '../utils';
import { ProjectService } from '../../infrastructure/services';

export class ProjectController {
  constructor(public readonly projectService: ProjectService) {}

  private HandleError(error: Error | CustomError, res: Response) {
    if (error instanceof CustomError) ErrorResponse(res, error.statusCode, error.message);

    console.log(`${error}`);
    return ErrorResponse(res, 500, { message: 'Internal server error' });
  }
}
