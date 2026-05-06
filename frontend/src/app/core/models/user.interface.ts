import { Gender } from '../enums/gender.enum';
import { UserRole } from '../enums/user-role.enum';
import { Game } from './game.interface';

export interface UserSummary {
  id: number;
  username: string;
  email: string;
  birthdate: string;
  gender: Gender;
  role: UserRole;
}

export interface User extends UserSummary {
  games?: Game[];
  friends?: UserSummary[];
  quizzes?: QuizzSummary[];
}

export interface QuizzSummary {
  id: number;
  title: string;
  imgUrl: string;
  visibility: string;
}

export interface UpdateUser {
  username?: string;
  email?: string;
  birthdate?: string;
  gender?: Gender;
}
