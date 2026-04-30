import { GameStatus } from '../enums/game-status.enum';

export class CreateGameDto {
  quizzId: number;
}

export class UpdateGameDto {
  score?: number;
  status?: GameStatus;
}
