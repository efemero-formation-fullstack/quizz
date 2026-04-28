import { QuestionDto } from 'src/dtos/question.dto';
import { ThemeDto } from 'src/dtos/theme.dto';
import { ThemeEntity } from 'src/entities/theme.entity';
import { questionEntityToQuestionDto } from './question.mapper';

export function themeEntityToDto(entity: ThemeEntity) {
  const dto = new ThemeDto();
  dto.id = entity.id;
  dto.name = entity.name;
  dto.questions = [];
  if (entity.questions) {
    for (const q of entity.questions) {
      dto.questions.push(q.id);
    }
  }
  return dto;
}
