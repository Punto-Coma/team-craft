import { PrismaClient } from '@prisma/client';
import { CreateGroupDTO, UpdateGroupDTO } from '../../../domain/dtos';
import { GroupRepository } from '../../../domain/repositories';
import { GroupEntity } from '../../../domain/entities/group.entity';

const prisma = new PrismaClient();

export class PrismaGroupRepository implements GroupRepository {
  async Create(data: CreateGroupDTO): Promise<GroupEntity | null> {
    return await prisma.group.create({
      data,
    });
  }

  Get(id: string): Promise<GroupEntity[] | null> {
    throw new Error('Method not implemented.');
  }

  GetById(userId: string, projectId: string): Promise<GroupEntity | null> {
    throw new Error('Method not implemented.');
  }

  Update(userId: string, projectId: string, data: UpdateGroupDTO): Promise<GroupEntity | null> {
    throw new Error('Method not implemented.');
  }

  Delete(userId: string, projectId: string): Promise<GroupEntity | null> {
    throw new Error('Method not implemented.');
  }
}
