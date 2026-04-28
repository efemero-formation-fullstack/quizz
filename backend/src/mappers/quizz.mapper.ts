import { QuizzDto } from 'src/dtos/quizz.dto';
import { QuizzEntity } from 'src/entities/quizz.entity';

export function QuizzEntityToDto(entity: QuizzEntity) {
  const dto = new QuizzDto();
  dto.id = entity.id;
  dto.title = entity.title;
  dto.imgUrl = entity.imgUrl;
  dto.visibility = entity.visibility;
  return dto;
}
