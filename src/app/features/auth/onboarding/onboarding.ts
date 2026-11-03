import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ShgService } from '../../../core/services/shg';
import { AuthService } from '../../../core/auth/services/auth';

@Component({
  selector: 'app-onboarding',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './onboarding.html',
  styleUrl: './onboarding.css',
})
export class Onboarding {
  private shgService = inject(ShgService);
  private auth = inject(AuthService);

  selectedMode = signal<'CREATE' | 'JOIN'>('CREATE');

  groupName = '';
  village = '';
  groupCode = '';

  message = signal<string>('');
  error = signal<string>('');
  isLoading = signal<boolean>(false);

  statusMessage = signal<string>('');
  isChecking = signal<boolean>(false);

  setMode(mode: 'CREATE' | 'JOIN'): void {
    this.selectedMode.set(mode);
    this.message.set('');
    this.error.set('');
  }

  onCreateGroup(): void {
    if (this.isLoading()) return;

    const name = this.groupName.trim();
    const village = this.village.trim();
    if (!name || !village) {
      this.error.set('Please enter the group name and village.');
      return;
    }

    this.message.set('');
    this.error.set('');
    this.isLoading.set(true);

    this.shgService.createGroup({ name, village }).subscribe({
      next: (res) => {
        this.message.set(`SHG Group created! Code: ${res.data.groupCode}. You are now the Admin.`);

        // Get the real role from the backend, then go to the dashboard
        this.auth.refreshUser().subscribe({
          next: () => setTimeout(() => this.auth.redirectByRole(), 2000),
          error: () => {
            this.isLoading.set(false);
            this.error.set('Group created. Please log in again.');
          },
        });
      },
      error: (err: HttpErrorResponse) => {
        this.isLoading.set(false);
        this.error.set(err.error?.message || err.error?.error || 'Failed to create group.');
      },
    });
  }

  onJoinGroup(): void {
    if (this.isLoading()) return;

    const code = this.groupCode.trim().toUpperCase();
    if (!code) {
      this.error.set('Please enter the group code.');
      return;
    }

    this.message.set('');
    this.error.set('');
    this.isLoading.set(true);

    this.shgService.joinGroup(code).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.groupCode = '';
        // Stay here: the person is still a Guest until the admin approves
        this.message.set('Join request sent! Waiting for the group Admin to approve.');
      },
      error: (err: HttpErrorResponse) => {
        this.isLoading.set(false);
        this.error.set(err.error?.message || err.error?.error || 'Failed to send join request.');
      },
    });
  }

  // Step 6b: "Check my status" button
  checkStatus(): void {
    this.isChecking.set(true);
    this.statusMessage.set('');

    this.auth.refreshUser().subscribe({
      next: () => {
        this.isChecking.set(false);
        if (this.auth.getRole() === 'GUEST') {
          this.statusMessage.set('Still waiting for approval. Please check again later.');
        } else {
          this.auth.redirectByRole();
        }
      },
      error: () => {
        this.isChecking.set(false);
        this.statusMessage.set('Could not check status. Please try again.');
      },
    });
  }
}