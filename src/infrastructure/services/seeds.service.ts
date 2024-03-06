import { CreateProjectDTO, CreateUserDTO } from '../../domain/dtos';
import { faker } from '@faker-js/faker';
import {
  AuthRepository,
  UserRepository,
  GroupRepository,
  ProjectRepository,
} from '../../domain/repositories';

import { CustomError, Password } from '../../presentation/utils';

export class SeedsService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly userRepository: UserRepository,
    private readonly projectRepository: ProjectRepository,
    private readonly groupRepository: GroupRepository
  ) {}

  public async Users() {
    try {
      for (let i = 0; i < 10; i++) {
        const user: CreateUserDTO = {
          email: faker.internet.email(),
          username: faker.internet.userName().substring(0, 10),
          password: faker.internet.password({ pattern: /[a-zA-Z0-9]/, length: 10 }),
        };

        user.password = await Password.GetHashedPassword(user.password);

        await this.authRepository.Create(user);
      }

      return { message: 'Users created' };
    } catch (error) {
      if (error instanceof CustomError) throw error;

      throw CustomError.InternalServer('Couldnt create users, please try again.');
    }
  }

  public async Projects() {
    try {
      const users = await this.userRepository.Get(10, 1);
      if (!users) throw CustomError.NotFound('Cannot get users.');

      for (let i = 0; i < 10; i++) {
        const project: CreateProjectDTO = {
          userId: users[i].id,
          name: faker.company.name(),
          description: faker.lorem.paragraph(),
          challenge: faker.helpers.arrayElement(['EASY', 'MEDIUM', 'HARD']),
          imageUrl: faker.image.url(),
          requirements: [faker.lorem.word(), faker.lorem.word(), faker.lorem.word()],
        };

        await this.projectRepository.Create(project);
      }

      return { message: 'Projects created' };
    } catch (error) {
      console.log(error);
      if (error instanceof CustomError) throw error;

      throw CustomError.InternalServer('Couldnt create projects, please try again.');
    }
  }
}
