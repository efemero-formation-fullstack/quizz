import { QuestionDto } from '../dtos/question.dto';
import { QuestionCreateDto } from '../dtos/question.form.dto';
import { QuestionEntity } from '../entities/question.entity';

export function questionEntityToQuestionDto(
  entity: QuestionEntity,
): QuestionDto {
  const dto = new QuestionDto();
  dto.answers = entity.answers;
  dto.correct_answer = entity.correct_answer;
  dto.question = entity.question;
  dto.id = entity.id;

  return dto;
}

export function questionEntityToQuestionListingDto(
  entity: QuestionEntity,
): QuestionDto {
  const dto = new QuestionDto();
  dto.answers = entity.answers;
  dto.correct_answer = entity.correct_answer;
  dto.question = entity.question;
  dto.id = entity.id;

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
