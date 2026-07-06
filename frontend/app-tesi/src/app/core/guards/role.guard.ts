import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../features/auth/services/auth.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const requiredRole = route.data?.['role'];

  // 🔴 Se non autenticato → blocca
  if (!authService.isAuthenticated()) {
    router.navigate(['/auth/login']);
    return false;
  }

  // 🔴 Se la route richiede un ruolo specifico
  if (requiredRole && authService.role() !== requiredRole) {
    router.navigate(['/']);
    return false;
  }

  return true;
};
