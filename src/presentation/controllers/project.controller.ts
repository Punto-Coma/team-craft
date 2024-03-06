import { Request, Response } from 'express';
import { CustomError, ErrorResponse, SuccessResponse } from '../utils';
import { ProjectService } from '../../infrastructure/services';
import { CreateProjectDTO, UpdateProjectDTO } from '../../domain/dtos';

export class ProjectController {
  constructor(public readonly projectService: ProjectService) {}

  public async CreateProject(
    req: Request<{ id: string }, object, CreateProjectDTO>,
    res: Response
  ) {
    const input = req.body;
    const userId = req.params.id;

    this.projectService
      .Create({ ...input, userId })
      .then((data) => SuccessResponse(res, 201, data))
      .catch((error: Error | CustomError) => this.HandleError(error, res));
  }

  public async GetProjects(req: Request, res: Response) {
    this.projectService
      .Get()
      .then((data) => SuccessResponse(res, 200, data))
      .catch((error: Error | CustomError) => this.HandleError(error, res));
  }

  public async GetProject(req: Request<{ projectId: string }, object, object>, res: Response) {
    const userId = req.currentUser!.id;

    this.projectService
      .GetSingle(userId, req.params.projectId)
      .then((data) => SuccessResponse(res, 200, data))
      .catch((error: Error | CustomError) => this.HandleError(error, res));
  }

  public async UpdateProject(
    req: Request<{ projectId: string }, object, UpdateProjectDTO>,
    res: Response
  ) {
    const input = req.body;
    const userId = req.currentUser!.id;

    this.projectService
      .Update(userId, req.params.projectId, input)
      .then((data) => SuccessResponse(res, 200, data))
      .catch((error: Error | CustomError) => this.HandleError(error, res));
  }

  public async DeleteProject(req: Request<{ projectId: string }, object, object>, res: Response) {
    const userId = req.currentUser!.id;

    this.projectService
      .Delete(userId, req.params.projectId)
      .then((data) => SuccessResponse(res, 200, data))
      .catch((error: Error | CustomError) => this.HandleError(error, res));
  }

  private HandleError(error: Error | CustomError, res: Response) {
    if (error instanceof CustomError) return ErrorResponse(res, error.statusCode, error.message);

    console.log(`${error}`);
    return ErrorResponse(res, 500, { message: 'Internal server error' });
  }
}
