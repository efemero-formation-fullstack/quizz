import type { QuizzDto } from './quizz.dto';
import { GameDto } from './game.dto';
import { Gender } from 'src/enums/gender.enum';
import { UserRole } from '../enums/user-role.enum';

export class UserDto {
  id: number;
  username: string;
  email: string;
  birthdate: Date;
  gender: Gender;
  role: UserRole;
  games?: GameDto[];
  friends?: UserDto[];
  quizzes?: QuizzDto[];
}
