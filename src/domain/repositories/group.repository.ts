import { CreateGroupDTO, UpdateGroupDTO } from '../dtos';
import { GroupEntity } from '../entities/group.entity';

export abstract class GroupRepository {
  abstract Create(data: CreateGroupDTO): Promise<GroupEntity | null>;
  abstract Get(id: string): Promise<GroupEntity[] | null>;
  abstract GetById(userId: string, projectId: string): Promise<GroupEntity | null>;
  abstract Update(
    userId: string,
    projectId: string,
    data: UpdateGroupDTO
  ): Promise<GroupEntity | null>;
  abstract Delete(userId: string, projectId: string): Promise<GroupEntity | null>;
}
