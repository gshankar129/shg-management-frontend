//Create JWT Auth Interceptor
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth';
import { catchError, throwError } from 'rxjs';


export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();// Retrieve stored JWT


  const authReq = token
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;

  return next(authReq).pipe(
    catchError((err) => {
      // Token expired or invalid: log out (but not for a wrong password at login)
      if (err.status === 401 && !req.url.includes('/auth/login')) {
        authService.logout();
      }
      return throwError(() => err);
    })
  );

  // if (token) {
  //   const cloned = req.clone({
  //     setHeaders: {
  //       Authorization: `Bearer ${token}`
  //     }
  //   });
  //   return next(cloned);
  // }
  // return next(req);
};
