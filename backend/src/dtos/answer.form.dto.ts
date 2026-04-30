import { IsNumber, IsString } from 'class-validator';

export class AnswerCreateDto {
  @IsString()
  answer: string;
  @IsNumber()
  question_id: number;
}
