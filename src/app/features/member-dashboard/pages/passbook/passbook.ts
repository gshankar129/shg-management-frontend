import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { PassbookTransaction, SavingsService } from '../../../savings/services/savings';

@Component({
  selector: 'app-passbook',
  standalone: true,
  imports: [CurrencyPipe, DatePipe],
  templateUrl: './passbook.html',
  styleUrl: './passbook.css',
})
export class Passbook implements OnInit {
  private savingsService = inject(SavingsService);

  balance = signal<number>(0);
  transactions = signal<PassbookTransaction[]>([]);
  isLoading = signal<boolean>(true);
  errorMessage = signal<string>('');

  totalDeposits = computed(() =>
    this.transactions()
      .filter((t) => t.type === 'SAVINGS_DEPOSIT')
      .reduce((sum, t) => sum + Number(t.amount), 0)
  );

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.isLoading.set(true);
    this.errorMessage.set('');

    this.savingsService.getMyPassbook().subscribe({
      next: (res) => {
        this.isLoading.set(false);
        this.balance.set(Number(res.data.currentBalance));
        this.transactions.set(res.data.transactions);
      },
      error: (err: HttpErrorResponse) => {
        this.isLoading.set(false);
        this.errorMessage.set(err.error?.message || 'Failed to load your passbook.');
      },
    });
  }

  label(type: string): string {
    switch (type) {
      case 'SAVINGS_DEPOSIT': return 'Deposit';
      case 'SAVINGS_WITHDRAWAL': return 'Withdrawal';
      case 'PENALTY': return 'Penalty';
      default: return type;
    }
  }

  isCredit(type: string): boolean {
    return type === 'SAVINGS_DEPOSIT';
  }
}