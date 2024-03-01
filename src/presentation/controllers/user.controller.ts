import { Request, Response } from 'express';
import { CustomError, ErrorResponse, SuccessResponse } from '../utils';
import { UserService } from '../../infrastructure/services';
import { UpdateUserDTO } from '../../domain/dtos';

export class UserController {
  constructor(public readonly userService: UserService) {}

  public async GetUsers(
    req: Request<{ limit: string; page: string }, object, object>,
    res: Response
  ) {
    const { limit = '10', page = '1' } = req.params;

    this.userService
      .Get(+limit, +page)
      .then((data) => SuccessResponse(res, 200, data))
      .catch((error: Error | CustomError) => this.HandleError(error, res));
  }

  public async GetUser(req: Request<{ userId: string }, object, object>, res: Response) {
    const userId = req.currentUser!.id;

    this.userService
      .GetSingle(userId)
      .then((data) => SuccessResponse(res, 200, data))
      .catch((error: Error | CustomError) => this.HandleError(error, res));
  }

  public async UpdateUser(
    req: Request<{ projectId: string }, object, UpdateUserDTO>,
    res: Response
  ) {
    const input = req.body;
    const userId = req.currentUser!.id;

    this.userService
      .Update(userId, input)
      .then((data) => SuccessResponse(res, 200, data))
      .catch((error: Error | CustomError) => this.HandleError(error, res));
  }

  public async DeleteUser(req: Request<{ projectId: string }, object, object>, res: Response) {
    const userId = req.currentUser!.id;

    this.userService
      .Delete(userId)
      .then((data) => SuccessResponse(res, 200, data))
      .catch((error: Error | CustomError) => this.HandleError(error, res));
  }

  private HandleError(error: Error | CustomError, res: Response) {
    console.log(error);
    if (error instanceof CustomError) return ErrorResponse(res, error.statusCode, error.message);

    console.log(`${error}`);
    return ErrorResponse(res, 500, { message: 'Internal server error' });
  }
}
