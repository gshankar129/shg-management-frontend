import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

export interface DepositPayload {
  memberId: number;
  amount: number;
}

export interface DepositResult {
  memberName: string;
  transactionId: number;
  amount: string;
  newBalance: string;
}

export interface PassbookTransaction {
  id: number;
  type: string;
  amount: string;
  txnDate: string;
}

export interface Passbook {
  currentBalance: string;
  transactions: PassbookTransaction[];
}

export interface SavingsApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

@Injectable({ providedIn: 'root' })
export class SavingsService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/savings`;

  // Admin: record a deposit for a member of their group
  recordDeposit(payload: DepositPayload): Observable<SavingsApiResponse<DepositResult>> {
    return this.http.post<SavingsApiResponse<DepositResult>>(this.apiUrl, payload);
  }

  // Member or Admin: my own passbook (used in the next step)
  getMyPassbook(): Observable<SavingsApiResponse<Passbook>> {
    return this.http.get<SavingsApiResponse<Passbook>>(`${this.apiUrl}/my`);
  }
}