import { Request, Response } from 'express';
import { CustomError, ErrorResponse, SuccessResponse } from '../utils';
import { GroupService } from '../../infrastructure/services';
import { AddMemberGroupDTO, CreateGroupDTO } from '../../domain/dtos';

export class GroupController {
  constructor(public readonly groupService: GroupService) {}

  public async CreateGroup(req: Request<object, object, CreateGroupDTO>, res: Response) {
    this.groupService
      .Create(req.body)
      .then((data) => SuccessResponse(req, res, 201, data))
      .catch((error: Error | CustomError) => this.HandleError(req, error, res));
  }

  public async AddMember(
    req: Request<{ groupId: string }, object, AddMemberGroupDTO>,
    res: Response
  ) {
    const { groupId } = req.params;

    this.groupService
      .AddMember(groupId, req.body.userId)
      .then((data) => SuccessResponse(req, res, 200, data))
      .catch((error: Error | CustomError) => this.HandleError(req, error, res));
  }

  public async GetGroups(req: Request<{ limit: string; page: string }>, res: Response) {
    const { limit = '10', page = '1' } = req.params;

    this.groupService
      .Get(+limit, +page)
      .then((data) => SuccessResponse(req, res, 200, data))
      .catch((error: Error | CustomError) => this.HandleError(req, error, res));
  }

  public async GetGroup(req: Request<{ groupId: string }, object, object>, res: Response) {
    const userId = req.currentUser!.id;

    this.groupService
      .GetSingle(userId, req.params.groupId)
      .then((data) => SuccessResponse(req, res, 200, data))
      .catch((error: Error | CustomError) => this.HandleError(req, error, res));
  }

  private HandleError(req: Request<unknown>, error: Error | CustomError, res: Response) {
    if (error instanceof CustomError)
      return ErrorResponse(req, res, error.statusCode, error.message);

    return ErrorResponse(req, res, 500, { message: 'Internal server error' });
  }
}
