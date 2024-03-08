import { Request, Response } from 'express';
import { CustomError, ErrorResponse, SuccessResponse } from '../utils';
import { AuthService } from '../../infrastructure/services';
import { CreateUserDTO, LoginUserDTO } from '../../domain/dtos';

export class AuthController {
  constructor(public readonly authService: AuthService) {}

  public RegisterUser(req: Request<object, object, CreateUserDTO>, res: Response) {
    const input = req.body;

    this.authService
      .Create(input)
      .then((data) => SuccessResponse(req, res, 201, data))
      .catch((error: Error | CustomError) => this.HandleError(req, error, res));
  }

  public LoginUser(req: Request<object, object, LoginUserDTO>, res: Response) {
    const input = req.body;

    this.authService
      .Login(input)
      .then((data) => SuccessResponse(req, res, 201, data))
      .catch((error: Error | CustomError) => this.HandleError(req, error, res));
  }

  private HandleError(req: Request<unknown>, error: Error | CustomError, res: Response) {
    if (error instanceof CustomError)
      return ErrorResponse(req, res, error.statusCode, error.message);

    return ErrorResponse(req, res, 500, { message: 'Internal server error' });
  }
}
