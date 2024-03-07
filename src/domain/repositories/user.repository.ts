import { CreateUserProfileDTO } from '../dtos';
import { UpdateUserDTO } from '../dtos/users/update-user.dto';
import { UserEntity } from '../entities/user.entity';
import { UserProfileEntity } from '../entities/user_profile.entity';

export abstract class UserRepository {
  abstract CreateProfile(data: CreateUserProfileDTO): Promise<UserProfileEntity | null>;
  abstract Get(limit: number, page: number): Promise<UserEntity[] | null>;
  abstract GetById(id: string): Promise<UserEntity | null>;
  abstract GetByEmail(email: string): Promise<UserEntity | null>;
  abstract Update(id: string, data: UpdateUserDTO): Promise<UserEntity | null>;
  abstract Delete(id: string): Promise<UserEntity | null>;
  abstract DeleteAll(): Promise<void>;
}
