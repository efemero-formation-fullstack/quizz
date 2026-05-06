import { GameStatus } from '../enums/game-status.enum';

export interface Game {
  id: number;
  score: number;
  status: GameStatus;
  userId: number;
  quizzId: number;
}
