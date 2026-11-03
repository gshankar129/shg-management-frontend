import { Component, inject } from '@angular/core';import { AuthService } from '../../../core/auth/services/auth';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  private authService = inject(AuthService);

  // Access signals directly from AuthService

  userName = this.authService.currentUser;

  // userRole = this.authService.userRole;

  onLogout(): void {
    this.authService.logout();
  }
}