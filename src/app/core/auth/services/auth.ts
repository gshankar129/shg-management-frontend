import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import {
  AuthResponse,
  AuthRegisterPayload,
  AuthLoginPayload,
} from '../models/auth.model';



@Injectable({ providedIn: 'root' })

export class AuthService {
  private http = inject(HttpClient);
  
  private apiUrl = `${environment.apiUrl}/auth`;
  
  // Inside AuthService class
  private router = inject(Router);

// Modern Angular Signals replace BehaviorSubject
  currentUser = signal<string | null>(localStorage.getItem('userName'));
  
  // 1. Fixed endpoint name: /register (matches Express register controller)
  register(payload: AuthRegisterPayload): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, payload);
  }

  // 2. Fixed token and user extraction from response.data

  login(credentials: AuthLoginPayload): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap((response) => {

        const token = response.data?.token;
        const user = response.data?.user;

        if (token) localStorage.setItem('token', token);
        if (user?.role) localStorage.setItem('role', user.role);

        const displayName = user?.name;  // user?.fullName || user?.name;
        if (displayName) {
          localStorage.setItem('userName', displayName);
          this.currentUser.set(displayName);
        }
      })
    );
  }

  refreshUser(): Observable<AuthResponse> {
  return this.http.get<AuthResponse>(`${this.apiUrl}/me`).pipe(
    tap((response) => {
      const user = response.data?.user;

      if (user?.role) localStorage.setItem('role', user.role);

      if (user?.name) {
        localStorage.setItem('userName', user.name);
        this.currentUser.set(user.name);
      }
    })
  );
}

  /** Clears storage only. Used by logout() and by the guards. */
  clearSession(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userName');
    this.currentUser.set(null);
  }

  logout(): void {
  this.clearSession();
  this.router.navigate(['/auth/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }

  isLoggedIn(): boolean {
    return !!this.getToken() && !this.isTokenExpired() ;
  }

  /** One place that says where each role lands. Must match app.routes.ts */
  getHomeRoute(role?: string | null): string {
    switch (role?.toUpperCase()) {
      case 'GUEST':
        return '/onboarding';
      case 'MEMBER':
        return '/member';
      case 'ADMIN':
        return '/admin';
      default:
        return '/auth/login';
    }
  }

  redirectByRole(): void {
    this.router.navigate([this.getHomeRoute(this.getRole())]);
  }

  private isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) return true;
    try {
      const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
      const payload = JSON.parse(atob(base64));
      return payload.exp * 1000 < Date.now();
    } catch {
      return true;
    }

  }
}