import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { GroupMember, ShgService } from '../../../../core/services/shg';
import { SavingsService } from '../../services/savings';

@Component({
  selector: 'app-record-savings',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './record-savings.html',
  styleUrl: './record-savings.css',
})
export class RecordSavings implements OnInit {
  private shgService = inject(ShgService);
  private savingsService = inject(SavingsService);

  members = signal<GroupMember[]>([]);
  isLoadingMembers = signal<boolean>(true);
  isSaving = signal<boolean>(false);
  message = signal<string>('');
  error = signal<string>('');

  memberId: number | null = null;
  amount: number | null = null;

  ngOnInit(): void {
    this.shgService.getGroupMembers().subscribe({
      next: (res) => {
        this.isLoadingMembers.set(false);
        this.members.set(res.data.members);
      },
      error: (err: HttpErrorResponse) => {
        this.isLoadingMembers.set(false);
        this.error.set(err.error?.message || 'Failed to load members.');
      },
    });
  }

  onSubmit(form: NgForm): void {
    if (this.isSaving() || this.memberId === null || this.amount === null) return;

    this.message.set('');
    this.error.set('');
    this.isSaving.set(true);

    this.savingsService
      .recordDeposit({ memberId: this.memberId, amount: this.amount })
      .subscribe({
        next: (res) => {
          this.isSaving.set(false);
          const balance = Number(res.data.newBalance).toFixed(2);
          this.message.set(`${res.message}. New balance: ₹${balance}`);
          form.resetForm();          // ready for the next member
          this.memberId = null;
          this.amount = null;
        },
        error: (err: HttpErrorResponse) => {
          this.isSaving.set(false);
          this.error.set(err.error?.message || 'Failed to record savings.');
        },
      });
  }
}