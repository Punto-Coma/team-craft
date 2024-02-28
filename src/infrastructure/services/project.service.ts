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
}
