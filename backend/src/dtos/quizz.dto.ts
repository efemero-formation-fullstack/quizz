import type { UserDto } from './user.dto';
import { QuizzVisibility } from 'src/enums/quizz_visibility.enum';
import { GameDto } from './game.dto';
import { ThemeDto } from './theme.dto';

export class QuizzDto {
  id: number;
  title: string;
  imgUrl: string;
  visibility: QuizzVisibility;
  theme: ThemeDto;
  questions: number[];
  games?: GameDto[];
  owner?: UserDto;
}
