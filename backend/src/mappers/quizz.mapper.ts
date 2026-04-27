import { QuizzDto } from 'src/dto/quizz.dto';
import { QuizzEntity } from 'src/entities/quizz.entity';

export function QuizzEntityToDto(entity: QuizzEntity) {
  const dto = new QuizzDto();
  dto.id = entity.id;
  dto.title = entity.title;
  dto.visibility = entity.visibility;
  return dto;
}
