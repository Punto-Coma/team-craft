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
      if (!data) return CustomError.BadRequest('Couldnt create group, please try again.');

      return data;
    } catch (error) {
      if (error instanceof CustomError) throw error;

      throw CustomError.InternalServer('Couldnt create group, please try again.');
    }
  }

  public async AddMember(groupId: string, userId: string) {
    try {
      const data = await this.groupRepository.Add(userId, groupId);
      if (!data) return CustomError.BadRequest('Couldnt add member to group, please try again.');

      return data;
    } catch (error) {
      if (error instanceof CustomError) throw error;

      throw CustomError.InternalServer('Couldnt create group, please try again.');
    }
  }

  public async Get(limit: number, page: number) {
    try {
      const data = await this.groupRepository.Get(limit, page);
      if (!data) return CustomError.NotFound('There are no groups.');

      return data;
    } catch (error) {
      if (error instanceof CustomError) throw error;

      throw CustomError.InternalServer('Couldnt get groups, please try again.');
    }
  }
}
