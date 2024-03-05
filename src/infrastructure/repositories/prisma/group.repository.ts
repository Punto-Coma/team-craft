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

  async Add(groupId: string, userId: string) {
    return await prisma
      .$transaction([
        prisma.groupMembers.create({
          data: {
            userId,
            groupId,
          },
        }),
        prisma.user.update({
          where: { id: userId },
          data: {
            groupId,
          },
        }),
      ])
      .finally(async () => await prisma.$disconnect());
  }

  async Get(limit: number = 10, page: number = 1): Promise<GroupEntity[] | null> {
    const offset = (page - 1) * limit;
    return prisma.group.findMany({
      take: limit,
      skip: offset,
      orderBy: { id: 'asc' },
    });
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
