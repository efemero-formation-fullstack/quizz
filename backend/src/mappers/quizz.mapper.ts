import { QuizzDto } from 'src/dtos/quizz.dto';
import { QuizzEntity } from 'src/entities/quizz.entity';
import { gameEntityToDto } from './game.mapper';

export function QuizzEntityToDto(entity: QuizzEntity) {
  const dto = new QuizzDto();
  dto.id = entity.id;
  dto.title = entity.title;
  dto.imgUrl = entity.imgUrl;
  dto.visibility = entity.visibility;
  if (entity.games) {
    dto.games = entity.games.map(gameEntityToDto);
  }
  return dto;
}
