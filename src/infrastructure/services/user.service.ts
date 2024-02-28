import { UserRepository } from '../../domain/repositories/user.repository';

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
}
