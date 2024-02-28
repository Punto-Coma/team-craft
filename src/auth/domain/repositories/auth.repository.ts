import { CreateUserDTO } from '../dtos/create-user.dto';
import { UserEntity } from '../entities/user.entity';

export abstract class AuthRepository {
  abstract Create(user: CreateUserDTO): Promise<UserEntity | void>;
  abstract UpdateVerifyUser(userId: number): Promise<UserEntity | null>;
}
