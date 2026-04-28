import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const connectedGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isConnected = authService.isConnected();
  if (isConnected) {
    // l'utilisateur est connecté
    return true;
  }
  // l'utilisateur n'est pas connecté
  // on le redirige vers la page de login
  router.navigate(['/', 'auth', 'login']);
  return false;
};
