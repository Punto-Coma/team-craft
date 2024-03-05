import { PrismaClient } from '@prisma/client';
import { CreateGroupDTO, UpdateGroupDTO } from '../../../domain/dtos';
import { GroupRepository } from '../../../domain/repositories';
import { GroupEntity } from '../../../domain/entities/group.entity';
import { GroupMembersEntity } from '../../../domain/entities/group-members.entity';
import { UserEntity } from '../../../domain/entities/user.entity';

const prisma = new PrismaClient();

export class PrismaGroupRepository implements GroupRepository {
  async Create(data: CreateGroupDTO): Promise<GroupEntity | null> {
    return await prisma.group.create({
      data,
    });
  }

  async Add(groupId: string, userId: string): Promise<[GroupMembersEntity, UserEntity]> {
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  GetById(userId: string, projectId: string): Promise<GroupEntity | null> {
    throw new Error('Method not implemented.');
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  Update(userId: string, projectId: string, data: UpdateGroupDTO): Promise<GroupEntity | null> {
    throw new Error('Method not implemented.');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  Delete(userId: string, projectId: string): Promise<GroupEntity | null> {
    throw new Error('Method not implemented.');
  }
}
