import { Role } from '@prisma/client';

export interface UserEntity {
  id: string;
  group_id?: string;
  email: string;
  role: Role;
  password?: string;
  isActive: boolean;
}
