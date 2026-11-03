import { Component, EventEmitter, Output, inject } from '@angular/core';
import { AuthService } from '../../auth/services/auth';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  @Output() toggleSidebar = new EventEmitter<void>();

  private auth = inject(AuthService);

  userName = this.auth.currentUser; // a signal, read it as userName() in the HTML

  onLogout(): void {
    this.auth.logout(); // clears token, role and name, then goes to /auth/login
  }
}