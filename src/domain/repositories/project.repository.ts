import { UpdateProjectDTO } from '../dtos/projects/update-project.dto';
import { ProjectEntity } from '../entities/project.entity';

export abstract class ProjectRepository {
  abstract Get(id: string): Promise<ProjectEntity[] | null>;
  abstract GetById(id: string): Promise<ProjectEntity | null>;
  abstract Update(id: string, data: UpdateProjectDTO): Promise<ProjectEntity | null>;
  abstract Delete(id: string): Promise<ProjectEntity | null>;
}
