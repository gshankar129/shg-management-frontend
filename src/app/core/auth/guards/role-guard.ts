import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth';

export const roleGuard = (allowedRoles: string[]): CanActivateFn => {
  return () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    const token = authService.getToken();
    const userRole = authService.getRole()?.toUpperCase();

    if (!token) {
      router.navigate(['/auth/login']);
      return false;
    }

    if (userRole && allowedRoles.includes(userRole)) {
      return true;
    }

    // Redirect to default route if role is unauthorized
    authService.redirectByRole();
    return false;
  };
};