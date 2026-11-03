import { Routes } from '@angular/router';
import { roleGuard } from '../../core/auth/guards/role-guard';

export const SAVINGS_ROUTES: Routes = [
  {
    path: 'record',
    canActivate: [roleGuard(['ADMIN'])],
    loadComponent: () =>
      import('./pages/record-savings/record-savings').then((m) => m.RecordSavings),
  },
];