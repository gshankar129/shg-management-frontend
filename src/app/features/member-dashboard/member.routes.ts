import { Routes } from '@angular/router';

import { MemberProfile } from './pages/member-profile/member-profile';

// export const MEMBER_ROUTES: Routes = [
//   { path: '', component: MemberProfile }
// ];

export const MEMBER_ROUTES: Routes = [
  {
    path: '',
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/member-profile/member-profile').then(
            (m) => m.MemberProfile
          )
      },
      {
        path: 'digital-passbook',
        loadComponent: () =>
          import('./components/digital-passbook/digital-passbook').then(
            (m) => m.DigitalPassbook
          )
      },
      {
        path: 'savings-summary',
        loadComponent: () =>
          import('./components/savings-summary/savings-summary').then(
            (m) => m.SavingsSummary
          )
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }
];