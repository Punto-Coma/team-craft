import { CreateGroupDTO } from '../../domain/dtos';
import { GroupRepository } from '../../domain/repositories';
import { CustomError } from '../../presentation/utils';

export class GroupService {
  constructor(private readonly groupRepository: GroupRepository) {}

  public async Create(input: CreateGroupDTO) {
    try {
      const data = await this.groupRepository.Create({
        ...input,
      });
      if (!data) return CustomError.NotFound('Couldnt create group, please try again.');

      return data;
    } catch (error) {
      if (error instanceof CustomError) throw error;

      throw CustomError.InternalServer('Couldnt create group, please try again.');
    }
  }
}
