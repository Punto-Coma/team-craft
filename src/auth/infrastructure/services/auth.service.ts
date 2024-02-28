import { CustomError } from '../../../common/utils/errors';
import { Password } from '../../../common/utils/password';
import { CreateUserDTO } from '../../domain/dtos/create-user.dto';
import { AuthRepository } from '../../domain/repositories/auth.repository';

export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}

  public async Create(input: CreateUserDTO) {
    try {
      const hashedPassword = await Password.GetHashedPassword(input.password);

      const data = await this.authRepository.Create({
        ...input,
        password: hashedPassword,
      });
      if (!data) return CustomError.NotFound('Couldnt create user, please try again.');

      if ('password' in data) delete data.password;

      const token = Password.GetToken({
        email: data.email,
        role: data.role,
        id: data.id,
      });

      return { token, data };
    } catch (error) {
      throw CustomError.InternalServer('Couldnt create user, please try again.');
    }
  }
}
