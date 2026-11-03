import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Member } from '../models/member.model';

@Injectable({ providedIn: 'root' })
export class GroupMember {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/users`;

  getMyGroupMembers(): Observable<Member[]> {
    return this.http
      .get<{ success: boolean; data: Member[] }>(`${this.apiUrl}/group-members`)
      .pipe(map((res) => res.data));
  }
}