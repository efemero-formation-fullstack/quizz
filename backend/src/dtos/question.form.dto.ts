import { IsString, MinLength } from 'class-validator';

export class QuestionCreateDto {
  @IsString()
  @MinLength(10)
  question: string;
}

export class QuestionUpdateDto {
  question?: string;
}
