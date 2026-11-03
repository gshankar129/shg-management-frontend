import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth';

export const roleGuard = (allowedRoles: string[]): CanActivateFn => {
  return () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    const token = authService.getToken();
    const userRole = authService.getRole()?.toUpperCase();
    
    //Not logged in , or token without a role
    if (!token || !userRole) {
      authService.logout();      // clear bad data
      return router.createUrlTree(['/auth/login']);
      

      //router.navigate(['/auth/login']);
      // return false;
    }
    // Allowed
    if (allowedRoles.includes(userRole)) {
      return true;
    }

    //wrong role: send to this role's own home page
    return router.createUrlTree([authService.getHomeRoute(userRole)]);
    
    // Redirect to default route if role is unauthorized
    // authService.redirectByRole();
    // return false;
  };
};