import { UpdateUserDTO } from '../../domain/dtos';
import { UserRepository } from '../../domain/repositories/user.repository';
import { CustomError } from '../../presentation/utils';

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async Get(limit: number, page: number) {
    try {
      const data = await this.userRepository.Get(limit, page);
      if (!data) return CustomError.NotFound('There are no users.');

      const sanitizedData = data.map((user) => {
        delete user.password;
        return user;
      });

      return sanitizedData;
    } catch (error) {
      this.HandleError(error, 'Could not retrieve users. Please try again.');
    }
  }

  public async GetSingle(userId: string) {
    try {
      const data = await this.userRepository.GetById(userId);
      if (!data) {
        throw CustomError.NotFound('There is no user whit this id.');
      }

      if ('password' in data) delete data.password;

      return data;
    } catch (error) {
      this.HandleError(error, 'Could not retrieve user. Please try again.');
    }
  }

  public async Update(userId: string, input: UpdateUserDTO) {
    try {
      const data = await this.userRepository.Update(userId, input);
      if (!data) return CustomError.NotFound('Couldnt update this user, please try again.');

      if ('password' in data) delete data.password;

      return data;
    } catch (error) {
      this.HandleError(error, 'Couldnt update user, please try again.');
    }
  }

  public async Delete(userId: string) {
    try {
      const data = await this.userRepository.Delete(userId);
      if (!data) return CustomError.NotFound('There is no project for this user.');

      return data;
    } catch (error) {
      this.HandleError(error, 'Couldnt delete this user, please try again.');
    }
  }

  private HandleError(error: unknown, errorMessage: string) {
    console.log(`ERROR [USER_SERVICE]: ${error}`);

    if (error instanceof CustomError) throw error;

    throw CustomError.InternalServer(errorMessage);
  }
}
