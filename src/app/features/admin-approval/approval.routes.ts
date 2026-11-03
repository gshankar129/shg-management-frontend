import { Routes } from '@angular/router';

export const APPROVAL_ROUTES: Routes = [
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./pages/admin-approval-dashboard/admin-approval-dashboard').then(
        (m) => m.AdminApprovalDashboard
      ),
  },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];