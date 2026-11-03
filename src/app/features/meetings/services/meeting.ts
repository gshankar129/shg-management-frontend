import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

export interface Meeting {
  id: number;
  title: string;
  meetingDate: string;
}

export interface MeetingApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

@Injectable({ providedIn: 'root' })
export class MeetingService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/meetings`;

  list(): Observable<MeetingApiResponse<Meeting[]>> {
    return this.http.get<MeetingApiResponse<Meeting[]>>(this.apiUrl);
  }

  create(title: string, meetingDate: string): Observable<MeetingApiResponse<Meeting>> {
    return this.http.post<MeetingApiResponse<Meeting>>(this.apiUrl, { title, meetingDate });
  }

  remove(id: number): Observable<MeetingApiResponse<null>> {
    return this.http.delete<MeetingApiResponse<null>>(`${this.apiUrl}/${id}`);
  }
}