import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface CreateGroupPayload {
  name: string;
  village: string;
}

export interface SHGGroup {
  id: number;
  name: string;
  village: string;
  groupCode: string;
  createdById: number;
  createdAt?: string;
}

export interface JoinRequest {
  id: number;
  userId: number;
  groupId: number;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  user?: {
    id: number;
    name: string;
    email: string;
    phone: string | null;
  };
  createdAt?: string;
}

export interface GroupMember {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  role: string;
}

export interface GroupMembersData {
  groupId: number;
  groupName: string;
  village: string;
  groupCode: string;
  totalMembers: number;
  members: GroupMember[];
}

export interface ServiceApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data: T;
}

@Injectable({ providedIn: 'root' })
export class ShgService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/groups`;

  // Guest: create a group and become ADMIN
  createGroup(payload: CreateGroupPayload): Observable<ServiceApiResponse<SHGGroup>> {
    return this.http.post<ServiceApiResponse<SHGGroup>>(`${this.apiUrl}/create`, payload);
  }

  // Guest: send a join request with a group code
  joinGroup(groupCode: string): Observable<ServiceApiResponse<JoinRequest>> {
    return this.http.post<ServiceApiResponse<JoinRequest>>(`${this.apiUrl}/join`, {
      groupCode: groupCode.trim().toUpperCase(),
    });
  }

  // Admin: pending requests of their own group
  getPendingRequests(): Observable<ServiceApiResponse<JoinRequest[]>> {
    return this.http.get<ServiceApiResponse<JoinRequest[]>>(`${this.apiUrl}/requests/pending`);
  }

  // Admin: approve or reject a request
  respondToRequest(
    requestId: number,
    action: 'APPROVE' | 'REJECT'
  ): Observable<ServiceApiResponse<null>> {
    return this.http.patch<ServiceApiResponse<null>>(
      `${this.apiUrl}/requests/${requestId}/respond`,
      { action }
    );
  }

  // Admin or Member: members of their own group (backend reads the group from the token)
  getGroupMembers(): Observable<ServiceApiResponse<GroupMembersData>> {
    return this.http.get<ServiceApiResponse<GroupMembersData>>(`${this.apiUrl}/members`);
  }
}