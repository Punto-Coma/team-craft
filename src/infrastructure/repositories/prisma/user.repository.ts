import { PrismaClient } from '@prisma/client';
import { UserEntity } from '../../../domain/entities/user.entity';
import { UpdateUserDTO } from '../../../domain/dtos/users/update-user.dto';
import { UserRepository } from '../../../domain/repositories/user.repository';

const prisma = new PrismaClient();

export class PrismaUserRepository implements UserRepository {
  async Get(limit: number = 10, page: number = 1): Promise<UserEntity[] | null> {
    const offset = (page - 1) * limit;

    return prisma.user.findMany({
      take: limit,
      skip: offset,
      orderBy: { id: 'asc' },
    });
  }

  async GetById(id: string): Promise<UserEntity | null> {
    return prisma.user.findUnique({
      where: { id },
    });
  }

  async GetByEmail(email: string): Promise<UserEntity | null> {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  async Update(id: string, userData: UpdateUserDTO): Promise<UserEntity | null> {
    const { username, email } = userData;

    return prisma.user.update({
      where: { id },
      data: { username, email },
    });
  }

  async Delete(id: string): Promise<UserEntity | null> {
    return prisma.user.delete({
      where: { id },
    });
  }
}
