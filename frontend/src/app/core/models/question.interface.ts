import { Theme } from './theme.interface';

export interface Question {
  question: string;
  answers: number[];
  theme: Theme;
}

export interface QuestionData extends Question {
  id: number;
  correct_answer_id: number;
}
