import { PrismaClient } from '@prisma/client';
import { ProjectEntity } from '../../../domain/entities/project.entity';
import { ProjectRepository } from '../../../domain/repositories/project.repository';
import { UpdateProjectDTO } from '../../../domain/dtos/projects/update-project.dto';

const prisma = new PrismaClient();

export class PrismaProjectRepository implements ProjectRepository {
  async Get(id: string): Promise<ProjectEntity[] | null> {
    return prisma.project.findMany({
      orderBy: { id: 'asc' },
      where: { id },
    });
  }

  async GetById(id: string): Promise<ProjectEntity | null> {
    return prisma.project.findUnique({
      where: { id },
    });
  }

  async Update(id: string, data: UpdateProjectDTO): Promise<ProjectEntity | null> {
    const { name, challenge, description, imageUrl, requirements } = data;

    return prisma.project.update({
      where: { id },
      data: { name, challenge, description, imageUrl, requirements },
    });
  }

  async Delete(id: string): Promise<ProjectEntity | null> {
    return prisma.project.delete({
      where: { id },
    });
  }
}
