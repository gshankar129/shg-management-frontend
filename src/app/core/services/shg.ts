import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Member } from '../../shared/models/user.model';

// --- Data Models & Interfaces ---

export interface CreateGroupPayload {
  name: string;
  village: string;
}

export interface JoinGroupPayload {
  groupCode: string;
}

export interface SHGGroup {
  id: number;
  name: string;
  village: string;
  groupCode: string;
  leaderId: number;
  createdAt?: string;
  updatedAt?: string;
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
    phone: string;
  };
  createdAt?: string;
}

export interface GroupMember {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  joinedAt?: string;
}

export interface ServiceApiResponse<T = any> {
  success: boolean;
  message: string;
  data: T;
}

@Injectable({
  providedIn: 'root'
})
export class ShgService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/groups`;

  //private apiUrl = 'http://localhost:3000/api/members';

  // For backend API integration:
  getMembersByGroup(groupId: string): Observable<Member[]> {
    return this.http.get<Member[]>(`${this.apiUrl}?groupId=${groupId}`);
  }



  /**
   * Step 2A: Create a new SHG Group (Promotes user to ADMIN/LEADER)
   */
  createGroup(payload: CreateGroupPayload): Observable<ServiceApiResponse<SHGGroup>> {
    return this.http.post<ServiceApiResponse<SHGGroup>>(`${this.apiUrl}/create`, payload).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Step 2B: Send a request to join an existing SHG Group using a group code
   */
  joinGroup(groupCode: string): Observable<ServiceApiResponse<JoinRequest>> {
    const payload: JoinGroupPayload = { groupCode: groupCode.toUpperCase() };
    return this.http.post<ServiceApiResponse<JoinRequest>>(`${this.apiUrl}/join`, payload).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Retrieve group details by Group ID
   */
  getGroupDetails(groupId: number): Observable<ServiceApiResponse<SHGGroup>> {
    return this.http.get<ServiceApiResponse<SHGGroup>>(`${this.apiUrl}/${groupId}`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Admin/Leader: Fetch all pending join requests for their SHG group
   */
  getPendingRequests(groupId: number): Observable<ServiceApiResponse<JoinRequest[]>> {
    return this.http.get<ServiceApiResponse<JoinRequest[]>>(`${this.apiUrl}/${groupId}/requests/pending`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Admin/Leader: Approve or Reject a member's join request
   */
  respondToRequest(requestId: number, action: 'APPROVE' | 'REJECT'): Observable<ServiceApiResponse> {
    return this.http.patch<ServiceApiResponse>(`${this.apiUrl}/requests/${requestId}/respond`, { action }).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Fetch all members belonging to a specific SHG group
   */
  getGroupMembers(groupId: number): Observable<ServiceApiResponse<GroupMember[]>> {
    return this.http.get<ServiceApiResponse<GroupMember[]>>(`${this.apiUrl}/${groupId}/members`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Member: Check status of current pending join request
   */
  getMyRequestStatus(): Observable<ServiceApiResponse<JoinRequest>> {
    return this.http.get<ServiceApiResponse<JoinRequest>>(`${this.apiUrl}/requests/my-status`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Centralized Http Error Handler
   */
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unexpected network error occurred. Please try again.';
    if (error.error && error.error.message) {
      errorMessage = error.error.message;
    } else if (error.status === 0) {
      errorMessage = 'Could not connect to the backend server.';
    }
    return throwError(() => new Error(errorMessage));
  }
}