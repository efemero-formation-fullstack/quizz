import { GameDto } from '../dtos/game.dto';
import { GameEntity } from '../entities/game.entity';

export function gameEntityToDto(entity: GameEntity): GameDto {
  const dto = new GameDto();
  dto.id = entity.id;
  dto.userId = entity.user?.id;
  dto.quizzId = entity.quizz?.id;
  dto.score = entity.score;
  dto.status = entity.status;
  return dto;
}
