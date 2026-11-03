import { Component, inject, OnInit, signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { JoinRequest, ShgService } from '../../../../core/services/shg';

@Component({
  selector: 'app-admin-approval-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './admin-approval-dashboard.html',
  styleUrl: './admin-approval-dashboard.css',
})
export class AdminApprovalDashboard implements OnInit {
  private shgService = inject(ShgService);

  pendingRequests = signal<JoinRequest[]>([]);
  isLoading = signal<boolean>(true);
  processingId = signal<number | null>(null);
  errorMessage = signal<string>('');
  successMessage = signal<string>('');

  ngOnInit(): void {
    this.fetchPendingRequests();
  }

  fetchPendingRequests(): void {
    this.isLoading.set(true);
    this.errorMessage.set('');

    this.shgService.getPendingRequests().subscribe({
      next: (res) => {
        this.isLoading.set(false);
        this.pendingRequests.set(res.data ?? []);
      },
      error: (err: HttpErrorResponse) => {
        this.isLoading.set(false);
        this.errorMessage.set(err.error?.message || 'Failed to load join requests.');
      },
    });
  }

  handleResponse(requestId: number, action: 'APPROVE' | 'REJECT'): void {
    if (this.processingId() !== null) return; // block double clicks

    this.processingId.set(requestId);
    this.errorMessage.set('');
    this.successMessage.set('');

    this.shgService.respondToRequest(requestId, action).subscribe({
      next: (res) => {
        this.processingId.set(null);
        this.successMessage.set(
          res.message || `Request ${action === 'APPROVE' ? 'approved' : 'rejected'}.`
        );
        this.pendingRequests.update((list) => list.filter((r) => r.id !== requestId));
        setTimeout(() => this.successMessage.set(''), 3000);
      },
      error: (err: HttpErrorResponse) => {
        this.processingId.set(null);
        this.errorMessage.set(err.error?.message || `Failed to ${action.toLowerCase()} request.`);
      },
    });
  }
}