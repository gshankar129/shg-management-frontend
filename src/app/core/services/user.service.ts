import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface UserProfile {
  id: number;
  name: string;
  email: string;
  userName: string;
  role: string;
  groupId: number | null;         
  shgName?: string | null;    // group name, may be empty
}

export interface UserProfileResponse {
  success: boolean;
  data: UserProfile;
}

@Injectable({ providedIn: 'root' })
export class UserService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/users`;

  getUserProfile(): Observable<UserProfileResponse> {
    return this.http.get<UserProfileResponse>(`${this.apiUrl}/me`);
  }
}