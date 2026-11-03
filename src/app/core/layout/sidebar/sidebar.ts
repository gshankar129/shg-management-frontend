import { AsyncPipe } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { AuthService } from '../../auth/services/auth';
import { UserProfile, UserService } from '../../services/user.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [AsyncPipe, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  @Input() isCollapsed = false;

  private userService = inject(UserService);
  private auth = inject(AuthService);

  // Role comes from login/refresh, so the menu shows at once
  role = this.auth.getRole();

  // Profile request supplies only the name and group
  userProfile$: Observable<UserProfile | null> = this.userService.getUserProfile().pipe(
    map((response) => (response.success ? response.data : null)),
    catchError(() => of(null))
  );
}