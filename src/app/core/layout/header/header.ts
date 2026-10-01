import { Component, EventEmitter, Output, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  @Output() toggleSidebar = new EventEmitter<void>();
  private router = inject(Router);

  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/auth/login']);
  }
}