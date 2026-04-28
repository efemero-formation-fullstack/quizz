import { AnswerDto } from './answer.dto';

export class QuestionDto {
  id: number;
  correct_answer: AnswerDto;
  question: string;
  answers?: AnswerDto[];
}

