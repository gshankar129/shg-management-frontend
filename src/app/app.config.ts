// src/app/app.config.ts

import { ApplicationConfig, inject, provideAppInitializer, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { authInterceptor } from './core/auth/interceptors/auth-interceptor';
import { AuthService } from './core/auth/services/auth';
import { catchError, firstValueFrom, of } from 'rxjs';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    // Pass both withFetch() and withInterceptors() into provideHttpClient
    provideHttpClient(
      withFetch(),
      withInterceptors([authInterceptor]) // 👈 Pass JWT Token automatically
    ),
    // Runs once before the app starts: refresh the role from the backend
    provideAppInitializer(() => {
      const auth = inject(AuthService);
      if (!auth.isLoggedIn()) return;
      return firstValueFrom(auth.refreshUser().pipe(catchError(() => of(null))));
    }),
  ]
}