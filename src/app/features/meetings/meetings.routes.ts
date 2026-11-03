import { Routes } from '@angular/router';

export const MEETING_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/meeting-list/meeting-list').then((m) => m.MeetingList),
  },
];