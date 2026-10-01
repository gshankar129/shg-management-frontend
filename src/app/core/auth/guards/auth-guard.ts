import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth';

// export const authGuard: CanActivateFn = (route, state) => {
//   return true;
// };

export const onboardingGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const token = authService.getToken();
  const role = authService.getRole()?.toUpperCase();

  // Redirect unauthenticated users to login
  if (!token) {
    router.navigate(['/auth/login']);
    return false;
  }
  // If already an ADMIN or MEMBER, redirect to their respective dashboard
  if (role === 'ADMIN') {
    router.navigate(['/admin/dashboard']);
    return false;
  } else if (role === 'MEMBER' || role === 'LEADER') {
    router.navigate(['/member/profile']);
    return false;
  }

  // Allow GUEST users to proceed
  return true;
}