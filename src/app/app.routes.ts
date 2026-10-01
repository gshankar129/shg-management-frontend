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
  // {
  //   path: 'member',
  //   loadChildren: () =>
  //     import('./features/member-dashboard/member.routes').then(
  //       (m) => m.MEMBER_ROUTES
  //     ),
  //     canActivate: [roleGuard(['MEMBER'])]
  // },

  // {
  //   path: 'leader',
  //   loadChildren: () =>
  //     import('./features/leader-approval/approval.routes').then(
  //       (m) => m.APPROVAL_ROUTES
  //     ),
  //     canActivate: [roleGuard(['ADMIN', 'LEADER'])]
  // },


  { path: '', redirectTo: 'auth/login', pathMatch: 'full' 

  },

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
        loadChildren: () => import('./features/member-dashboard/member.routes').then(m => m.MEMBER_ROUTES)
      },
      {
        path: 'loans',
        loadChildren: () => import('./features/loan-management/loan.routes').then(m => m.LOAN_ROUTES)
      },
      {
        path: 'approval',
        loadChildren: () => import('./features/leader-approval/approval.routes').then(m => m.APPROVAL_ROUTES)
      },
      { path: '', redirectTo: 'member', pathMatch: 'full' }
    ]
  },
  //Fallback
  { path: '**', redirectTo: 'auth/login' }
];





// // src/app/app.routes.ts
// import { Routes } from '@angular/router';
// import { authGuard } from './core/auth/guards/auth-guard';


// export const routes: Routes = [
//   {
//     path: 'auth/login',
//     loadComponent: () => import('./features/auth/login/login').then(m => m.Login)
//   },
//   {
//     path: 'auth/signup',
//     loadComponent: () => import('./features/auth/signup/signup').then(m => m.Signup)
//   },
//   {
//     path: 'approval',
//     canActivate: [authGuard],
//     loadChildren: () => import('./features/leader-approval/approval.routes').then(m => m.APPROVAL_ROUTES)
//   },
//   {
//     path: 'member',
//     canActivate: [authGuard],
//     loadChildren: () => import('./features/member-dashboard/member.routes').then(m => m.MEMBER_ROUTES)
//   },
//   {
//     path: 'loans',
//     canActivate: [authGuard],
//     loadChildren: () => import('./features/loan-management/loan.routes').then(m => m.LOAN_ROUTES)
//   },
//   { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
//   { path: '**', redirectTo: 'auth/login' }
// ];