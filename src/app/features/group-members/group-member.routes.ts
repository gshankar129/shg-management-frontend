// (Feature route definition)
import { Routes } from '@angular/router';
import { MemberList } from './pages/member-list/member-list';

export const ALL_MEMBERS_ROUTES: Routes = [
  {
    path: '',
    //component: MemberList
    loadComponent: () => 
      import('./pages/member-list/member-list').then(m => m.MemberList)
  }
];