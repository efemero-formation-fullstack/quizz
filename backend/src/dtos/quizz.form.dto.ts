import { QuizzVisibility } from '../enums/quizz_visibility.enum';

export class QuizzCreateDto {
  title: string;
  imgUrl: string;
  visibility?: QuizzVisibility;
  themeIds?: number[];
}

export class QuizzUpdateDto {
  title?: string;
  imgUrl?: string;
  visibility?: QuizzVisibility;
  themeIds?: number[];
}
