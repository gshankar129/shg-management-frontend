import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/api';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  private authService = inject(AuthService);

  // Access signals directly from AuthService
  // currentUser = this.authService.currentUser;
  // userRole = this.authService.userRole;

  // onLogout(): void {
  //   this.authService.logout();
  // }
}