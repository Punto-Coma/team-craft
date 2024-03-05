import { CreateGroupDTO, UpdateGroupDTO } from '../dtos';
import { GroupMembersEntity } from '../entities/group-members.entity';
import { GroupEntity } from '../entities/group.entity';
import { UserEntity } from '../entities/user.entity';

export abstract class GroupRepository {
  abstract Create(data: CreateGroupDTO): Promise<GroupEntity | null>;
  abstract Get(limit: number, page: number): Promise<GroupEntity[] | null>;
  abstract GetById(userId: string, groupId: string): Promise<GroupEntity | null>;
  abstract Add(userId: string, groupId: string): Promise<[GroupMembersEntity, UserEntity]>;
  abstract Update(
    userId: string,
    groupId: string,
    data: UpdateGroupDTO
  ): Promise<GroupEntity | null>;
  abstract Delete(userId: string, groupId: string): Promise<GroupEntity | null>;
}
