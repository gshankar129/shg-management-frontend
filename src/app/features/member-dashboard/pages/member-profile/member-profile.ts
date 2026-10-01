import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Navbar } from '../../../../shared/components/navbar/navbar';


@Component({
  selector: 'app-member-profile',
  standalone: true,
  imports: [CommonModule,Navbar],
  templateUrl: './member-profile.html',
  styleUrl: './member-profile.css'
})
export class MemberProfile {
  
}







// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';

// export interface PassbookEntry {
//   id: string;
//   date: string;
//   type: 'SAVINGS' | 'LOAN';
//   category: 'CREDIT' | 'DEBIT';
//   description: string;
//   receiptNo: string;
//   amount: number;
//   runningBalance: number;
// }

// @Component({
//   selector: 'app-member-profile',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './member-profile.html',
//   styleUrl: './member-profile.css'
// })
// export class MemberProfile implements OnInit {
//   selectedFilter: 'ALL' | 'SAVINGS' | 'LOAN' = 'ALL';

//   transactions: PassbookEntry[] = [
//     {
//       id: 'tx-101',
//       date: '02 Aug 2026',
//       type: 'SAVINGS',
//       category: 'CREDIT',
//       description: 'Monthly Savings Deposit',
//       receiptNo: 'RCP-8892',
//       amount: 500,
//       runningBalance: 12400
//     },
//     {
//       id: 'tx-102',
//       date: '15 Jul 2026',
//       type: 'LOAN',
//       category: 'DEBIT',
//       description: 'Loan Repayment EMI',
//       receiptNo: 'RCP-8421',
//       amount: 500,
//       runningBalance: 4200
//     },
//     {
//       id: 'tx-103',
//       date: '02 Jul 2026',
//       type: 'SAVINGS',
//       category: 'CREDIT',
//       description: 'Monthly Savings Deposit',
//       receiptNo: 'RCP-8110',
//       amount: 500,
//       runningBalance: 11900
//     },
//     {
//       id: 'tx-104',
//       date: '10 Jun 2026',
//       type: 'LOAN',
//       category: 'CREDIT',
//       description: 'Emergency Loan Disbursed',
//       receiptNo: 'DISB-0041',
//       amount: 5000,
//       runningBalance: 5000
//     }
//   ];

//   filteredTransactions: PassbookEntry[] = [];

//   ngOnInit() {
//     this.applyFilter();
//   }

//   setFilter(filter: 'ALL' | 'SAVINGS' | 'LOAN') {
//     this.selectedFilter = filter;
//     this.applyFilter();
//   }

//   applyFilter() {
//     if (this.selectedFilter === 'ALL') {
//       this.filteredTransactions = this.transactions;
//     } else {
//       this.filteredTransactions = this.transactions.filter(
//         tx => tx.type === this.selectedFilter
//       );
//     }
//   }

//   downloadPassbook() {
//     alert('Generating PDF receipt statement...');
//   }
// }