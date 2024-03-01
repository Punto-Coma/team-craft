import { CreateProjectDTO } from '../../domain/dtos';
import { ProjectRepository } from '../../domain/repositories';
import { CustomError } from '../../presentation/utils';

export class ProjectService {
  constructor(private readonly projectRepository: ProjectRepository) {}

  public async Create(input: CreateProjectDTO) {
    try {
      const data = await this.projectRepository.Create({
        ...input,
      });
      if (!data) return CustomError.NotFound('Couldnt create project, please try again.');

      return { data };
    } catch (error) {
      throw CustomError.InternalServer('Couldnt create project, please try again.');
    }
  }

  public async Get(id: string) {
    try {
      const data = await this.projectRepository.Get(id);
      if (!data) return CustomError.NotFound('There is no project for this user.');

      return { data };
    } catch (error) {
      throw CustomError.InternalServer('Couldnt get projects, please try again.');
    }
  }

  public async GetSingle(userId: string, projectId: string) {
    try {
      const data = await this.projectRepository.GetById(userId, projectId);
      if (!data) return CustomError.NotFound('There is no project for this user.');

      return { data };
    } catch (error) {
      throw CustomError.InternalServer('Couldnt get this project, please try again.');
    }
  }

  public async Delete(userId: string, projectId: string) {
    try {
      const data = await this.projectRepository.Delete(userId, projectId);
      if (!data) return CustomError.NotFound('There is no project for this user.');

      return { data };
    } catch (error) {
      throw CustomError.InternalServer('Couldnt delete this project, please try again.');
    }
  }
}
