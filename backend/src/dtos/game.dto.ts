import { GameStatus } from '../enums/game-status.enum';

export class GameDto {
  id: number;
  userId: number;
  quizzId: number;
  score: number;
  status: GameStatus;
}
