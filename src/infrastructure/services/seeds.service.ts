import { CreateGroupDTO, CreateProjectDTO, CreateUserDTO } from '../../domain/dtos';
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

  public async Groups() {
    try {
      const projects = await this.projectRepository.Get();
      if (!projects) throw CustomError.NotFound('Cannot get projects.');

      for (let i = 0; i < 10; i++) {
        const group: CreateGroupDTO = {
          projectId: projects[i].id!,
          name: faker.company.name(),
          projectEnds: faker.date.future(),
        };

        await this.groupRepository.Create(group);
      }

      return { message: 'Groups created' };
    } catch (error) {
      console.log(error);
      if (error instanceof CustomError) throw error;

      throw CustomError.InternalServer('Couldnt create groups, please try again.');
    }
  }

  public async All() {
    try {
      await this.CleanData();

      await this.Users();
      await this.Projects();
      await this.Groups();

      return { message: 'Data successfully created.' };
    } catch (error) {
      console.log(error);
      if (error instanceof CustomError) throw error;

      throw CustomError.InternalServer('Couldnt run seeder, please try again.');
    }
  }

  private async CleanData() {
    try {
      await this.groupRepository.DeleteAll();
      await this.projectRepository.DeleteAll();
      await this.userRepository.DeleteAll();
    } catch (error) {
      console.log(error);
      if (error instanceof CustomError) throw error;

      throw CustomError.InternalServer('Couldnt delete data, please try again.');
    }
  }
}
