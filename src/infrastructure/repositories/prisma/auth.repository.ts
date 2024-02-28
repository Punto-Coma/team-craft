import { PrismaClient } from '@prisma/client';
import { CreateUserDTO } from '../../../domain/dtos/auth/create-user.dto';
import { UserEntity } from '../../../domain/entities/user.entity';
import { AuthRepository } from '../../../domain/repositories/auth.repository';

const prisma = new PrismaClient();

export class PrismaAuthRepository implements AuthRepository {
  UpdateVerifyUser(userId: number): Promise<UserEntity | null> {
    console.log(userId);
    throw new Error('Method not implemented.');
  }

  async Create(user: CreateUserDTO): Promise<UserEntity | void> {
    const { username, email, password } = user;

    return await prisma.user.create({
      data: {
        username,
        email,
        role: 'MEMBER',
        password,
      },
    });
  }
}
