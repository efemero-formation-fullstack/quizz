import { Routes } from '@angular/router';
import { adminGuard } from '../../core/guards/admin.guard';
import { connectedGuard } from '../../core/guards/connected.guard';

export const USER_ROUTES: Routes = [
  {
    path: 'me',
    canActivate: [connectedGuard],
    loadComponent: () =>
      import('./user-profile-page/user-profile-page').then((m) => m.UserProfilePage),
  },
  {
    path: ':id',
    canActivate: [adminGuard],
    loadComponent: () =>
      import('./user-profile-page/user-profile-page').then((m) => m.UserProfilePage),
  },
];
