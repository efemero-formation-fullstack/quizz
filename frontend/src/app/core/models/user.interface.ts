import { UserRole } from '../enums/user-role.enum';

export interface User {
  id: number;
  username: string;
  email: string;
  birthdate: string;
  gender: string;
  role: UserRole;
}

export interface UpdateUser {
  username?: string;
  email?: string;
  birthdate?: string;
  gender?: string;
}
