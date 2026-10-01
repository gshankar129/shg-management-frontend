import { Routes } from '@angular/router';
import { LeaderApprovalDashboard } from './pages/leader-approval-dashboard/leader-approval-dashboard';


// export const APPROVAL_ROUTES: Routes = [
//   { path: '', component:  LeaderApprovalDashboard}
// ];

export const APPROVAL_ROUTES: Routes = [
  {
    path: '',
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/leader-approval-dashboard/leader-approval-dashboard').then(
            (m) => m.LeaderApprovalDashboard
          )
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }
];