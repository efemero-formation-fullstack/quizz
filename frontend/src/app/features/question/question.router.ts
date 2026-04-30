import { Routes } from '@angular/router';
export const routes: Routes = [
  {
    path: 'question',
    loadComponent: () => import('./pages/question-page/question-page').then((c) => c.QuestionPage),
  },
];
