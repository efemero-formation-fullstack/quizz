import { QuestionDto } from '../dtos/question.dto';
import { QuestionCreateDto } from '../dtos/question.form.dto';
import { QuestionEntity } from '../entities/question.entity';
import { answerEntityToListingDto } from './answer.mapper';
import { themeEntityToDto } from './theme.mapper';

export function questionEntityToQuestionDto(
  entity: QuestionEntity,
): QuestionDto {
  const dto = new QuestionDto();
  dto.answers = [];
  for (const a of entity.answers) {
    dto.answers?.push(answerEntityToListingDto(a));
  }
  dto.correct_answer = answerEntityToListingDto(entity.correct_answer);
  dto.question = entity.question;
  dto.id = entity.id;
  dto.theme = themeEntityToDto(entity.theme);

  return dto;
}

export function questionEntityToQuestionListingDto(
  entity: QuestionEntity,
): QuestionDto {
  const dto = new QuestionDto();
  dto.answers = [];
  for (const a of entity.answers) {
    dto.answers?.push(answerEntityToListingDto(a));
  }
  dto.correct_answer = answerEntityToListingDto(entity.correct_answer);
  dto.question = entity.question;
  dto.id = entity.id;
  dto.theme = themeEntityToDto(entity.theme);

  return dto;
}

export function questionCreateDtoToQuestionEntity(
  dto: QuestionCreateDto,
): Partial<QuestionEntity> {
  const entity = new QuestionEntity();
  entity.question = dto.question;
  return entity;
}

export function questionUpdateDtoToQuestionEntity(
  dto: QuestionCreateDto,
): Partial<QuestionEntity> {
  const entity = new QuestionEntity();
  entity.question = dto.question;
  return entity;
}
