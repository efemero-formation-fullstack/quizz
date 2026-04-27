import { QuizzVisibility } from 'src/enums/quizz_visibility.enum';

export class QuizzDto {
  id: number;
  title: string;
  imgUrl: string;
  visibility: QuizzVisibility;
}
