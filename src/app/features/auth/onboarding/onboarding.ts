import { Component, inject, signal } from '@angular/core';
import { ShgService } from '../../../core/services/shg';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-onboarding',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './onboarding.html',
  styleUrl: './onboarding.css',
})
export class Onboarding {
  private shgService = inject(ShgService);
  private router = inject (Router);

  //Tab State: 'CREATE' or 'JOIN'
  selectedMode = signal<'CREATE' | 'JOIN'>('CREATE');

  // Create Group Form Fields
  groupName = '';
  village = '';

  // Join Group Form Field
  groupCode = '';

  // UI Reactive State
  message = signal<string>('');
  error = signal<string>('');
  isLoading = signal<boolean>(false);

  setMode(mode: 'CREATE' | 'JOIN'): void {
    this.selectedMode.set(mode);
    this.message.set('');
    this.error.set('');
  }

  // Handle Step 2A: Create New Group
  onCreateGroup(): void {
    this.message.set('');
    this.error.set('');
    this.isLoading.set(true);

    this.shgService.createGroup({ name: this.groupName.trim(), village: this.village.trim() }).subscribe({
      next: (res) => {
        this.isLoading.set(false);
        this.message.set(`SHG Group created! Code: ${res.data.groupCode}. You are now the Admin.`);
        
        // Update local storage role to ADMIN
        localStorage.setItem('role', 'ADMIN');

        setTimeout(() => {
          this.router.navigate(['/admin/dashboard']);
        }, 2000);
      },
      error: (err: HttpErrorResponse) => {
        this.isLoading.set(false);
        const errMsg = err.error?.message || err.error?.error || 'Failed to create group.';
        this.error.set(errMsg);
      }
    });
  }

  // Handle Step 2B: Request to Join Group
  onJoinGroup(): void {
    this.message.set('');
    this.error.set('');
    this.isLoading.set(true);

    this.shgService.joinGroup(this.groupCode.trim().toUpperCase()).subscribe({
      next: (res) => {
        this.isLoading.set(false);
        this.message.set('Join request sent successfully! Waiting for group Admin approval.');
        
        setTimeout(() => {
          this.router.navigate(['/member/profile']);
        }, 2000);
      },
      error: (err: HttpErrorResponse) => {
        this.isLoading.set(false);
        const errMsg = err.error?.message || err.error?.error || 'Failed to send join request.';
        this.error.set(errMsg);
      }
    });
  }
}


