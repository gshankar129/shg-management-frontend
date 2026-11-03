import { Routes } from '@angular/router';

export const MEMBER_ROUTES: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/passbook/passbook').then((m) => m.Passbook),
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./pages/member-profile/member-profile').then((m) => m.MemberProfile),
  },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];