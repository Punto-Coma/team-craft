import { CustomError } from '../../../common/utils/errors';
import { Password } from '../../../common/utils/password';
import { CreateUserDTO, LoginUserDTO } from '../../domain/dtos';
import { AuthRepository } from '../../domain/repositories/auth.repository';
import { UserRepository } from '../../domain/repositories/user.repository';

export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly userRepository: UserRepository
  ) {}

  public async Create(input: CreateUserDTO) {
    try {
      const emailExists = await this.userRepository.GetByEmail(input.email);
      if (emailExists) return CustomError.BadRequest('Email already exists.');

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

  public async Login(input: LoginUserDTO) {
    try {
      const data = await this.userRepository.GetByEmail(input.email);
      if (!data)
        return CustomError.NotFound('Invalid credentials. Please check your email and password.');

      const verified = await Password.ValidatePassword(input.password, data.password!);

      if (!verified)
        return CustomError.NotFound('Invalid credentials. Please check your email and password.');

      const token = Password.GetToken({
        email: data.email,
        role: data.role,
        id: data.id,
      });

      return token;
    } catch (error) {
      throw CustomError.InternalServer('Couldnt login user, please try again.');
    }
  }
}
