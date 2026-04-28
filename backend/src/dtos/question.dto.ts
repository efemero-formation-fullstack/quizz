import { AnswerDto } from './answer.dto';
import { ThemeDto } from './theme.dto';

export class QuestionDto {
  id: number;
  correct_answer: AnswerDto;
  question: string;
  answers?: AnswerDto[];
  theme: ThemeDto;
}
