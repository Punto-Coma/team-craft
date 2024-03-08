import { Request, Response } from 'express';
import { CustomError, ErrorResponse, SuccessResponse } from '../utils';
import { UserService } from '../../infrastructure/services';
import { CreateUserProfileDTO, UpdateUserDTO } from '../../domain/dtos';

export class UserController {
  constructor(public readonly userService: UserService) {}

  public async CreateProfile(
    req: Request<{ id: string }, object, CreateUserProfileDTO>,
    res: Response
  ) {
    const { id } = req.params;
    const { userId, ...data } = req.body;

    this.userService
      .CreateProfile({ userId: userId || id, ...data })
      .then((data) => SuccessResponse(req, res, 200, data))
      .catch((error: Error | CustomError) => this.HandleError(error, req, res));
  }

  public async GetUsers(
    req: Request<object, object, object, { limit: string; page: string }>,
    res: Response
  ) {
    const { limit = '10', page = '1' } = req.query;

    this.userService
      .Get(+limit, +page)
      .then((data) => SuccessResponse(req, res, 200, data))
      .catch((error: Error | CustomError) => this.HandleError(error, req, res));
  }

  public async GetUser(req: Request<{ id: string }>, res: Response) {
    const { id } = req.params;

    this.userService
      .GetSingle(id)
      .then((data) => SuccessResponse(req, res, 200, data))
      .catch((error: Error | CustomError) => this.HandleError(error, req, res));
  }

  public async UpdateUser(req: Request<{ id: string }, object, UpdateUserDTO>, res: Response) {
    const { id } = req.params;

    this.userService
      .Update(id, req.body)
      .then((data) => SuccessResponse(req, res, 200, data))
      .catch((error: Error | CustomError) => this.HandleError(error, req, res));
  }

  public async DeleteUser(req: Request<{ id: string }>, res: Response) {
    const { id } = req.params;

    this.userService
      .Delete(id)
      .then((data) => SuccessResponse(req, res, 200, data))
      .catch((error: Error | CustomError) => this.HandleError(error, req, res));
  }

  private HandleError(error: Error | CustomError, req: Request<unknown>, res: Response) {
    if (error instanceof CustomError) {
      return ErrorResponse(req, res, error.statusCode, error.message);
    }

    return ErrorResponse(req, res, 500, { message: 'Internal server error' });
  }
}
