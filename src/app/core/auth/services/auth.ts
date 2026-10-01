import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { AuthResponse } from '../../services/api';
import { Router } from '@angular/router';


export interface AuthRegisterPayload {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export interface AuthLoginPayload{
  mobile?: string;
  email?: string;
  password : string;

}

// export interface AuthResponse {
//   success: boolean;
//   message: string;
//   token?: string;
//   data?:{
//     user?:{
//       id: string;
//       name?: string;
//       email: string;
//       phone: string;
//       role?: 'LEADER' | 'ADMIN' | 'MEMBER' | string;
//     };
//     token?: string;
//   };
//   errors?: Array<{ field: string; message: string }>;
// }

@Injectable({ providedIn: 'root' })

export class AuthService {
  private http = inject(HttpClient);
  
  private apiUrl = `${environment.apiUrl}/auth`;
  
  // Inside AuthService class
  private router = inject(Router);

  redirectByRole(): void {
    const role = this.getRole()?.toUpperCase();

    switch (role) {
      case 'SUPERADMIN':
      case 'SUPER_ADMIN':
        this.router.navigate(['/superadmin/dashboard']);
        break;
      case 'ADMIN':
        this.router.navigate(['/admin/dashboard']);
        break;
      case 'MEMBER':
      case 'LEADER':
        this.router.navigate(['/member/profile']);
        break;
      case 'GUEST':
      // Direct newly registered guests to the onboarding setup page
      this.router.navigate(['/onboarding']);
      break;  
      default:
        this.router.navigate(['/login']);
        break;
    }
  }


  // Modern Angular Signals replace BehaviorSubject
  currentUser = signal<string | null>(localStorage.getItem('userName'));
  
  // 1. Fixed endpoint name: /register (matches Express register controller)
  register(payload: AuthRegisterPayload): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, payload, {
      withCredentials: true
    });
  }

  // 2. Fixed token and user extraction from response.data

  login(credentials: AuthLoginPayload): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials, {
      withCredentials: true
    }).pipe(
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

        // Auto-redirect user based on role
        this.redirectByRole();

        // if (response.token) localStorage.setItem('token', response.token);
        // if (response.role) localStorage.setItem('role', response.role);
        // if (response.name) {
        //   localStorage.setItem('userName', response.name);
        //   this.currentUser.set(response.name);
        // }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userName');
    this.currentUser.set(null);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}