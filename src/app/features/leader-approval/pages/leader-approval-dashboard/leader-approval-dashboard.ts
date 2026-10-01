import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JoinRequest, ShgService } from '../../../../core/services/shg';
import { HttpErrorResponse } from '@angular/common/http';

export interface MemberApprovalRequest {
  id: string;
  fullName: string;
  phone: string;
  aadhaarLastFour: string;
  villageBlock: string;
  proposedSavings: number;
  appliedDate: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  actionDate?: string;
  rejectionReason?: string;
}

@Component({
  selector: 'app-leader-approval-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './leader-approval-dashboard.html',
  styleUrl: './leader-approval-dashboard.css'
})
export class LeaderApprovalDashboard implements OnInit {
  private shgService = inject(ShgService);

  // Signals for state management
  groupId = signal<number | null>(null);
  pendingRequests = signal<JoinRequest[]>([]);
  isLoading = signal<boolean>(true);
  errorMessage = signal<string>('');
  successMessage = signal<string>('');

  ngOnInit(): void {
    const storedGroupId = localStorage.getItem('groupId');
    if (storedGroupId) {
      const id = Number(storedGroupId);
      this.groupId.set(id);
      this.fetchPendingRequests(id);
    } else {
      this.isLoading.set(false);
      this.errorMessage.set('No active Group ID found for this leader account.');
    }
  }

  fetchPendingRequests(groupId: number): void {
    this.isLoading.set(true);
    this.errorMessage.set('');

    this.shgService.getPendingRequests(groupId).subscribe({
      next: (res) => {
        this.isLoading.set(false);
        this.pendingRequests.set(res.data || []);
      },
      error: (err: HttpErrorResponse) => {
        this.isLoading.set(false);
        this.errorMessage.set(err.message || 'Failed to load join requests.');
      }
    });
  }

  handleResponse(requestId: number, action: 'APPROVE' | 'REJECT'): void {
    this.errorMessage.set('');
    this.successMessage.set('');

    this.shgService.respondToRequest(requestId, action).subscribe({
      next: (res) => {
        const actionText = action === 'APPROVE' ? 'approved' : 'rejected';
        this.successMessage.set(res.message || `Member request ${actionText} successfully.`);

        // Remove processed request from state
        this.pendingRequests.update((requests) =>
          requests.filter((req) => req.id !== requestId)
        );

        setTimeout(() => this.successMessage.set(''), 3000);
      },
      error: (err: HttpErrorResponse) => {
        this.errorMessage.set(err.message || `Failed to ${action.toLowerCase()} request.`);
      }
    });
  }
}

  // selectedTab: 'PENDING' | 'HISTORY' = 'PENDING';
  // searchQuery = '';

  // activeMemberForRejection: MemberApprovalRequest | null = null;
  // rejectionReason = '';
  // customReasonText = '';

  // allMembers: MemberApprovalRequest[] = [
  //   {
  //     id: 'MEM-001',
  //     fullName: 'Anita Devi',
  //     phone: '9876543210',
  //     aadhaarLastFour: 'XXXX-XXXX-4812',
  //     villageBlock: 'Badarpur, Block A',
  //     proposedSavings: 500,
  //     appliedDate: '01 Aug 2026',
  //     status: 'PENDING'
  //   },
  //   {
  //     id: 'MEM-002',
  //     fullName: 'Meena Kumari',
  //     phone: '9811223344',
  //     aadhaarLastFour: 'XXXX-XXXX-9901',
  //     villageBlock: 'Badarpur, Block B',
  //     proposedSavings: 300,
  //     appliedDate: '30 Jul 2026',
  //     status: 'PENDING'
  //   },
  //   {
  //     id: 'MEM-003',
  //     fullName: 'Pooja Rani',
  //     phone: '9711882200',
  //     aadhaarLastFour: 'XXXX-XXXX-1144',
  //     villageBlock: 'Tughlakabad Village',
  //     proposedSavings: 500,
  //     appliedDate: '25 Jul 2026',
  //     status: 'APPROVED',
  //     actionDate: '26 Jul 2026'
  //   }
  // ];

  // filteredMembers: MemberApprovalRequest[] = [];
  // pendingMembers: MemberApprovalRequest[] = [];
  // historyMembers: MemberApprovalRequest[] = [];

  // ngOnInit() {
  //   this.refreshData();
  // }

  // setTab(tab: 'PENDING' | 'HISTORY') {
  //   this.selectedTab = tab;
  //   this.filterRequests();
  // }

  // refreshData() {
  //   this.pendingMembers = this.allMembers.filter(m => m.status === 'PENDING');
  //   this.historyMembers = this.allMembers.filter(m => m.status !== 'PENDING');
  //   this.filterRequests();
  // }

//   filterRequests() {
//     const query = this.searchQuery.toLowerCase().trim();
//     const targetList = this.selectedTab === 'PENDING' ? this.pendingMembers : this.historyMembers;

//     if (!query) {
//       this.filteredMembers = [...targetList];
//     } else {
//       this.filteredMembers = targetList.filter(
//         m => m.fullName.toLowerCase().includes(query) ||
//              m.phone.includes(query) ||
//              m.aadhaarLastFour.includes(query)
//       );
//     }
//   }

//   approveMember(id: string) {
//     const member = this.allMembers.find(m => m.id === id);
//     if (member) {
//       member.status = 'APPROVED';
//       member.actionDate = new Date().toLocaleDateString('en-GB', {
//         day: '2-digit', month: 'short', year: 'numeric'
//       });
//       this.refreshData();
//     }
//   }

//   openRejectModal(member: MemberApprovalRequest) {
//     this.activeMemberForRejection = member;
//     this.rejectionReason = '';
//     this.customReasonText = '';
//   }

//   closeRejectModal() {
//     this.activeMemberForRejection = null;
//   }

//   confirmRejection() {
//     if (!this.activeMemberForRejection) return;

//     const finalReason = this.rejectionReason === 'Custom' 
//       ? this.customReasonText 
//       : this.rejectionReason;

//     if (!finalReason) {
//       alert('Please select or provide a rejection reason.');
//       return;
//     }

//     const member = this.allMembers.find(m => m.id === this.activeMemberForRejection?.id);
//     if (member) {
//       member.status = 'REJECTED';
//       member.rejectionReason = finalReason;
//       member.actionDate = new Date().toLocaleDateString('en-GB', {
//         day: '2-digit', month: 'short', year: 'numeric'
//       });
//       this.refreshData();
//     }

//     this.closeRejectModal();
//   }

//   getInitials(name: string): string {
//     return name
//       .split(' ')
//       .map(part => part[0])
//       .join('')
//       .substring(0, 2)
//       .toUpperCase();
//   }
// }