export interface UserEntity {
  id: string;
  group_id?: string;
  email: string;
  role: string;
  password?: string;
  isActive: boolean;
}
