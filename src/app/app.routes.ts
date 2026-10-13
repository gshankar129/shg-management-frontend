import { Routes } from '@angular/router';
import { roleGuard } from './core/auth/guards/role-guard';

export const routes: Routes = [
  // Auth routes (No sidebar / navbar)
  {
    path: 'auth/login',
    loadComponent: () => import('./features/auth/login/login').then(m => m.Login)
  },
  {
    path: 'auth/register',
    loadComponent: () => import('./features/auth/register/register').then(m => m.Register)
  },
  { 
    path: 'onboarding', 
    loadComponent: () => import('./features/auth/onboarding/onboarding').then(m => m.Onboarding),
    canActivate: [roleGuard(['GUEST'])] 
  },

  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },

  // Main Application (With Header & Sidebar Shell)
  {
    path: '',
    loadComponent: () => import('./core/layout/main-layout/main-layout').then(m => m.MainLayout),
    children: [
      {
        path: 'leader',
        loadChildren: () =>
          import('./features/leader-approval/approval.routes').then(
            (m) => m.APPROVAL_ROUTES
          ),
          canActivate: [roleGuard(['ADMIN', 'LEADER'])]
      },
      {
        path: 'member',
        loadChildren: () => 
          import('./features/member-dashboard/member.routes').then(m => m.MEMBER_ROUTES)
      },
      {
        path: 'loans',
        loadChildren: () => import('./features/loan-management/loan.routes').then(m => m.LOAN_ROUTES)
      },

      {
        path: 'all-members',
        canActivate: [roleGuard(['ADMIN', 'LEADER', 'MEMBER'])],
        loadChildren: () => 
          import('./features/group-members/group-member.routes')
            .then(m => m.ALL_MEMBERS_ROUTES)
      },
      // {
      //   path: 'approval',
      //   loadChildren: () => import('./features/leader-approval/approval.routes').then(m => m.APPROVAL_ROUTES)
      // },
      { path: '', redirectTo: 'member', pathMatch: 'full' }
    ]
  },
  //Fallback
  { path: '**', redirectTo: 'auth/login' }
];

