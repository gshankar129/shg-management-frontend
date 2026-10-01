import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-loan-request-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './loan-request-form.html',
  styleUrl: './loan-request-form.css'
})
export class LoanRequestForm implements OnInit {
  // Input parameters
  loanPurpose = '';
  loanAmount = 10000;
  tenureMonths = 12;
  annualInterestRate = 12; // 12% p.a. standard SHG rate

  tenureOptions = [6, 12, 18, 24];

  // Calculation outputs
  emiAmount = 0;
  totalInterest = 0;
  totalRepayment = 0;

  principalPercentage = 100;
  interestPercentage = 0;

  ngOnInit() {
    this.calculateEmi();
  }

  selectTenure(months: number) {
    this.tenureMonths = months;
    this.calculateEmi();
  }

  /**
   * Standard Reducing Balance EMI Calculation Formula:
   * E = P * r * (1 + r)^n / ((1 + r)^n - 1)
   */
  calculateEmi() {
    if (this.loanAmount <= 0 || this.tenureMonths <= 0) return;

    const principal = this.loanAmount;
    const monthlyRate = (this.annualInterestRate / 100) / 12;
    const numberOfPayments = this.tenureMonths;

    const emiFactor = Math.pow(1 + monthlyRate, numberOfPayments);
    this.emiAmount = (principal * monthlyRate * emiFactor) / (emiFactor - 1);

    this.totalRepayment = this.emiAmount * numberOfPayments;
    this.totalInterest = this.totalRepayment - principal;

    // Percentages for the proportion bar
    this.principalPercentage = (principal / this.totalRepayment) * 100;
    this.interestPercentage = (this.totalInterest / this.totalRepayment) * 100;
  }

  submitLoanApplication() {
    const loanPayload = {
      purpose: this.loanPurpose,
      amount: this.loanAmount,
      tenureMonths: this.tenureMonths,
      annualInterestRate: this.annualInterestRate,
      monthlyEmi: Math.round(this.emiAmount),
      totalRepayment: Math.round(this.totalRepayment),
      status: 'SUBMITTED'
    };

    console.log('Submitting Loan Application:', loanPayload);
    alert(`Loan request of ₹${this.loanAmount.toLocaleString()} submitted successfully for Group Approval!`);
  }
}