import { Request, Response } from 'express';
import { CustomError, ErrorResponse, SuccessResponse } from '../utils';
import { SeedsService } from '../../infrastructure/services/seeds.service';

export class SeedsController {
  constructor(public readonly seedsService: SeedsService) {}

  public async CreateAll(req: Request, res: Response) {
    this.seedsService
      .All()
      .then((data) => SuccessResponse(res, 201, data))
      .catch((error: Error | CustomError) => this.HandleError(error, res));
  }

  public async CreateUsers(req: Request, res: Response) {
    this.seedsService
      .Users()
      .then((data) => SuccessResponse(res, 201, data))
      .catch((error: Error | CustomError) => this.HandleError(error, res));
  }

  public async CreateProjects(req: Request, res: Response) {
    this.seedsService
      .Projects()
      .then((data) => SuccessResponse(res, 201, data))
      .catch((error: Error | CustomError) => this.HandleError(error, res));
  }

  public async CreateGroups(req: Request, res: Response) {
    this.seedsService
      .Groups()
      .then((data) => SuccessResponse(res, 201, data))
      .catch((error: Error | CustomError) => this.HandleError(error, res));
  }

  private HandleError(error: Error | CustomError, res: Response) {
    if (error instanceof CustomError) return ErrorResponse(res, error.statusCode, error.message);

    console.log(`${error}`);
    return ErrorResponse(res, 500, { message: 'Internal server error' });
  }
}
