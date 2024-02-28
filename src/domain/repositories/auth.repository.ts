import { CreateUserDTO } from '../dtos/auth/create-user.dto';
import { UserEntity } from '../entities/user.entity';

export abstract class AuthRepository {
  abstract Create(user: CreateUserDTO): Promise<UserEntity | void>;
}
