import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

export interface ActiveLoan {
  loanId: string;
  purposeTitle: string;
  disbursedDate: string;
  principalAmount: number;
  totalRepayableAmount: number;
  totalRepaid: number;
  outstandingBalance: number;
  monthlyEmi: number;
  totalTenureMonths: number;
  emisRemaining: number;
  paidPercentage: number;
}

export interface RepaymentReceipt {
  date: string;
  loanId: string;
  receiptNo: string;
  paymentType: string;
  principalPaid: number;
  interestPaid: number;
  totalPaid: number;
}

export interface EmiInstallment {
  installmentNo: number;
  dueDate: string;
  emi: number;
  status: 'PAID' | 'DUE';
}

@Component({
  selector: 'app-loan-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loan-dashboard.html',
  styleUrl: './loan-dashboard.css'
})
export class LoanDashboard implements OnInit {
  activeLoans: ActiveLoan[] = [
    {
      loanId: 'LN-2026-089',
      purposeTitle: 'Small Enterprise / Grocery Shop Stock',
      disbursedDate: '10 Feb 2026',
      principalAmount: 20000,
      totalRepayableAmount: 22400,
      totalRepaid: 11200,
      outstandingBalance: 11200,
      monthlyEmi: 1866,
      totalTenureMonths: 12,
      emisRemaining: 6,
      paidPercentage: 50
    }
  ];

  repaymentHistory: RepaymentReceipt[] = [
    {
      date: '10 Jul 2026',
      loanId: 'LN-2026-089',
      receiptNo: 'RCP-2026-904',
      paymentType: 'Monthly EMI',
      principalPaid: 1666,
      interestPaid: 200,
      totalPaid: 1866
    },
    {
      date: '10 Jun 2026',
      loanId: 'LN-2026-089',
      receiptNo: 'RCP-2026-812',
      paymentType: 'Monthly EMI',
      principalPaid: 1650,
      interestPaid: 216,
      totalPaid: 1866
    }
  ];

  selectedLoanForSchedule: ActiveLoan | null = null;
  scheduleList: EmiInstallment[] = [];

  totalOutstandingBalance = 0;
  nextEmiAmount = 0;

  constructor(private router: Router) {}

  ngOnInit() {
    this.calculateOverviewMetrics();
  }

  calculateOverviewMetrics() {
    this.totalOutstandingBalance = this.activeLoans.reduce((sum, l) => sum + l.outstandingBalance, 0);
    this.nextEmiAmount = this.activeLoans.reduce((sum, l) => sum + l.monthlyEmi, 0);
  }

  openApplyLoanModal() {
    // Navigate to the Loan Calculator component we built
    this.router.navigate(['/loans/apply']);
  }

  payEmi(loan: ActiveLoan) {
    alert(`Initiating EMI payment of ₹${Math.round(loan.monthlyEmi)} for ${loan.loanId}.`);
  }

  toggleScheduleModal(loan: ActiveLoan) {
    this.selectedLoanForSchedule = loan;
    
    // Generate mock schedule list
    this.scheduleList = [
      { installmentNo: 1, dueDate: '10 Mar 2026', emi: loan.monthlyEmi, status: 'PAID' },
      { installmentNo: 2, dueDate: '10 Apr 2026', emi: loan.monthlyEmi, status: 'PAID' },
      { installmentNo: 3, dueDate: '10 May 2026', emi: loan.monthlyEmi, status: 'PAID' },
      { installmentNo: 4, dueDate: '10 Jun 2026', emi: loan.monthlyEmi, status: 'PAID' },
      { installmentNo: 5, dueDate: '10 Jul 2026', emi: loan.monthlyEmi, status: 'PAID' },
      { installmentNo: 6, dueDate: '10 Aug 2026', emi: loan.monthlyEmi, status: 'DUE' },
      { installmentNo: 7, dueDate: '10 Sep 2026', emi: loan.monthlyEmi, status: 'DUE' },
      { installmentNo: 8, dueDate: '10 Oct 2026', emi: loan.monthlyEmi, status: 'DUE' },
    ];
  }
}