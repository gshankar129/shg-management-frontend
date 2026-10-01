// src/app/features/leader-approval/approval.routes.ts
import { Routes } from '@angular/router';
import { LoanDashboard } from './pages/loan-dashboard/loan-dashboard';


export const LOAN_ROUTES: Routes = [
  { path: '', component:  LoanDashboard },

  {
    path: '',
    loadComponent: () => import('./components/loan-request-form/loan-request-form').then(m => m.LoanRequestForm)
  }
];