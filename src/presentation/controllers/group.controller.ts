import { Request, Response } from 'express';
import { CustomError, ErrorResponse, SuccessResponse } from '../utils';
import { GroupService } from '../../infrastructure/services';
import { CreateGroupDTO } from '../../domain/dtos';

export class GroupController {
  constructor(public readonly groupService: GroupService) {}

  public async CreateGroup(req: Request<object, object, CreateGroupDTO>, res: Response) {
    this.groupService
      .Create(req.body)
      .then((data) => SuccessResponse(res, 201, data))
      .catch((error: Error | CustomError) => this.HandleError(error, res));
  }

  private HandleError(error: Error | CustomError, res: Response) {
    console.log(error);
    if (error instanceof CustomError) return ErrorResponse(res, error.statusCode, error.message);

    console.log(`${error}`);
    return ErrorResponse(res, 500, { message: 'Internal server error' });
  }
}
