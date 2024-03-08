import { PrismaClient } from '@prisma/client';
import { UserEntity } from '../../../domain/entities/user.entity';
import { UserRepository } from '../../../domain/repositories/user.repository';
import { CreateUserProfileDTO, UpdateUserDTO } from '../../../domain/dtos';
import { UserProfileEntity } from '../../../domain/entities/user_profile.entity';

const prisma = new PrismaClient();

export class PrismaUserRepository implements UserRepository {
  async CreateProfile(data: CreateUserProfileDTO): Promise<UserProfileEntity | null> {
    return await prisma.userData.create({ data });
  }

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
    return prisma.user.update({
      where: { id },
      data: { ...userData },
    });
  }

  async Delete(id: string): Promise<void> {
    await prisma
      .$transaction([
        prisma.groupMembers.deleteMany({
          where: { userId: id },
        }),
        prisma.userData.deleteMany({
          where: { userId: id },
        }),
        prisma.user.delete({
          where: { id },
        }),
      ])
      .finally(async () => await prisma.$disconnect());
  }

  async DeleteAll(): Promise<void> {
    try {
      await prisma.user.deleteMany();
    } catch (error) {
      console.log(error);
    } finally {
      await prisma.$disconnect();
    }
  }
}
