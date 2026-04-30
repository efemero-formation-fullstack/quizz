import { IsNumber, IsString, MinLength } from 'class-validator';

export class QuestionCreateDto {
  @IsString()
  @MinLength(10)
  question: string;

  @IsNumber()
  theme_id: number;

  @IsNumber()
  correct_answer_id: number;
}

export class QuestionUpdateDto {
  question?: string;
}
