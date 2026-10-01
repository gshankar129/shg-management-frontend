// src/app/services/auth.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface AuthPayload {
  email: string;
  password: string;
}

export type UserRole = 'SUPER_ADMIN' | 'SUPERADMIN' | 'LEADER' | 'ADMIN' | 'MEMBER' | 'GUEST' | string;

export interface User {
  id: string;
  email: string;
  phone: string;
  name?: string;
  role?: UserRole;
}

export interface AuthData {
  user?: User;
  token?: string;
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
  data?: AuthData;
  errors?: ValidationError[];
}

export interface UserProfile {
  id: number;
  userName: string;
  role: string;
  shgName: string | null;
}

export interface UserProfileResponse {
  success: boolean;
  data: UserProfile;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/auth`;

  register(payload: AuthPayload): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, payload, {
      withCredentials: true
    });
  }
}

// Added @Injectable decorator here
@Injectable({ providedIn: 'root' })
export class UserService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/users`;

  getUserProfile(): Observable<UserProfileResponse> {
    const token = localStorage.getItem('auth_token');

    return this.http.get<UserProfileResponse>(`${this.apiUrl}/me`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      withCredentials: true
    });
  }
}