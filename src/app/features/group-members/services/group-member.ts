import { inject, Injectable, signal } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { Member } from '../models/member.model';

@Injectable({
  providedIn: 'root',
})
export class GroupMember {

  private http = inject(HttpClient);
  private apiUrl= `${environment.apiUrl}/users`;

  getMyGroupMembers():Observable<Member[]>{
    return this.http.get<Member[]>(`${this.apiUrl}/group-members`);
  }
}


// (Service for fetching member dummy/API data)