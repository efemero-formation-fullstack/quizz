import { AnswerDto } from 'src/dtos/answer.dto';
import { AnswerCreateDto } from 'src/dtos/answer.form.dto';
import { AnswerEntity } from 'src/entities/answer.entity';
import { questionEntityToQuestionDto } from './question.mapper';

export function answerEntityToAnswerDto(entity: AnswerEntity): AnswerDto {
  const dto = new AnswerDto();
  dto.answer = entity.answer;
  dto.id = entity.id;
  dto.question = questionEntityToQuestionDto(entity.question);

  return dto;
}

export function answerEntityToListingDto(entity: AnswerEntity): AnswerDto {
  const dto = new AnswerDto();

  dto.answer = entity.answer;
  dto.id = entity.id;
  if (entity.question) {
    dto.question = questionEntityToQuestionDto(entity.question);
  }
  return dto;
}

export function answerCreateDtoToAnswerEntity(
  dto: AnswerCreateDto,
): Partial<AnswerEntity> {
  const entity = new AnswerEntity();
  entity.answer = dto.answer;
  return entity;
}

export function answerUpdateDtoToAnswerEntity(
  dto: AnswerCreateDto,
): Partial<AnswerEntity> {
  const entity = new AnswerEntity();
  entity.answer = dto.answer;
  return entity;
}
