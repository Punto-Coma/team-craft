import { PrismaClient } from '@prisma/client';
import { ProjectEntity } from '../../../domain/entities/project.entity';
import { ProjectRepository } from '../../../domain/repositories/project.repository';

import { CreateProjectDTO, UpdateProjectDTO } from '../../../domain/dtos';

const prisma = new PrismaClient();

export class PrismaProjectRepository implements ProjectRepository {
  async Create(data: CreateProjectDTO): Promise<ProjectEntity | null> {
    return await prisma.project.create({
      data,
    });
  }

  async Get(userId: string): Promise<ProjectEntity[] | null> {
    return prisma.project.findMany({
      orderBy: { id: 'asc' },
      where: { userId },
    });
  }

  async GetById(userId: string, projectId: string): Promise<ProjectEntity | null> {
    return prisma.project.findUnique({
      where: { userId, id: projectId },
    });
  }

  async Update(
    userId: string,
    projectId: string,
    data: UpdateProjectDTO
  ): Promise<ProjectEntity | null> {
    return prisma.project.update({
      where: { userId, id: projectId },
      data,
    });
  }

  async Delete(userId: string, projectId: string): Promise<ProjectEntity | null> {
    return await prisma.project.delete({
      where: { userId, id: projectId },
    });
  }
}
