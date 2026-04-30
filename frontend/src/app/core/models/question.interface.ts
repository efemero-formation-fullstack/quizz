import { Theme } from './theme.interface';

export interface Question {
  question: string;
  answers: number[];
  theme: Theme;
  id: number;
  correct_answer_id: number;
}

export interface QuestionData extends Omit<Question, 'answers'> {}
