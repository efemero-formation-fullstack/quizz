import type { QuizzDto } from './quizz.dto';
import type { UserDto } from './user.dto';
import { GameStatus } from '../enums/game-status.enum';

export class GameDto {
  id: number;
  user: UserDto;
  quizz: QuizzDto;
  score: number;
  status: GameStatus;
}
