import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UserProfile, UserService } from '../../services/api';
import { catchError, map, Observable, of } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar {
  @Input() isCollapsed = false;
  private userService = inject(UserService);

  userProfile$: Observable<UserProfile | null> = this.userService.getUserProfile().pipe(
    map((response) => response.success ? response.data : null),
    catchError((err) => {
      console.error('Failed to load profile data:', err);
      return of(null);
    })
  );
}