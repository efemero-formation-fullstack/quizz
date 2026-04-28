import { Gender } from '../enums/gender.enum';
import { UserRole } from '../enums/user-role.enum';

export interface User {
  id: number;
  username: string;
  email: string;
  birthdate: string;
  gender: Gender;
  role: UserRole;
}

export interface UpdateUser {
  username?: string;
  email?: string;
  birthdate?: string;
  gender?: Gender;
}
