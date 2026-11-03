import { Routes } from '@angular/router';
import { roleGuard } from './core/auth/guards/role-guard';
import {authGuard} from './core/auth/guards/auth-guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', 
    loadComponent: () => import('./features/home/home').then(m => m.Home) 
  },
  // Auth routes (No sidebar / navbar) Public pages
  {
    path: 'auth/login',
    loadComponent: () => import('./features/auth/login/login').then(m => m.Login),
  },
  {
    path: 'auth/register',
    loadComponent: () => import('./features/auth/register/register').then(m => m.Register),
  },
  //Guest onboarding (Create or join group)
  { 
    path: 'onboarding', 
    loadComponent: () => import('./features/auth/onboarding/onboarding').then(m => m.Onboarding),
    canActivate: [authGuard, roleGuard(['GUEST'])] 
  },

  // Main Application (With Header & Sidebar Shell), login required for everythings inside
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () => import('./core/layout/main-layout/main-layout').then(m => m.MainLayout),
    children: [
      {
        path: 'admin',
        canActivate: [roleGuard(['ADMIN'])],
        loadChildren: () =>
          import('./features/admin-approval/approval.routes').then(
            (m) => m.APPROVAL_ROUTES
          ),
      },
      {
        path: 'member',
        canActivate: [roleGuard(['MEMBER', 'ADMIN'])],
        loadChildren: () => 
          import('./features/member-dashboard/member.routes').then(m => m.MEMBER_ROUTES)
      },
      {
        path: 'loans',
        canActivate: [roleGuard(['ADMIN','MEMBER'])],
        loadChildren: () => import('./features/loan-management/loan.routes').then(m => m.LOAN_ROUTES)
      },

      {
        path: 'all-members',
        canActivate: [roleGuard(['ADMIN','MEMBER'])],
        loadChildren: () => 
          import('./features/group-members/group-member.routes')
            .then(m => m.ALL_MEMBERS_ROUTES)
      },
      
    ]
  },
  //Fallback
  { path: '**', redirectTo: '' }

  // The wildcard ** going to login is acceptable, but redirecting to '' is smarter because logged-in users stay inside the app.

  // { path: '**', redirectTo: 'auth/login' }
];

