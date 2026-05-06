import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./features/auth/login-page/login-page').then((m) => m.LoginPage),
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./features/auth/register-page/register-page').then((m) => m.RegisterPage),
      },
    ],
  },
  {
    path: 'question',
    loadComponent: () =>
      import('./features/question/pages/question-page/question-page').then((m) => m.QuestionPage),
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./features/dashboard/dashboard-page/dashboard-page').then((m) => m.DashboardPage),
  },
  {
    path: 'admin',
    loadChildren: () => import('./features/admin/admin.routes').then((m) => m.ADMIN_ROUTES),
  },
  {
    path:'quizz',
    loadComponent: () =>
      import('./features/quizz/pages/quizz-list/quizz-list').then((m) => m.QuizzList),
  },
  {
    path: 'quizz/create',
    loadComponent: () =>
      import('./features/quizz/pages/quizz-create/quizz-create').then((m) => m.QuizzCreate),
  },
  {
    path: 'quizz/:id/play',
    loadComponent: () =>
      import('./features/quizz/pages/quizz-play/quizz-play').then((m) => m.QuizzPlay),
  },
  {
    path: 'user',
    loadChildren: () => import('./features/user/user.routes').then((m) => m.USER_ROUTES),
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];
