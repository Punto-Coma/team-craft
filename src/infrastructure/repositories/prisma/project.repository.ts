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
    return prisma.project.update({
      where: { id },
      data,
    });
  }

  async Delete(id: string): Promise<ProjectEntity | null> {
    return prisma.project.delete({
      where: { id },
    });
  }
}
