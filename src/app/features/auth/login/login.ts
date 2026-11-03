import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../../core/auth/services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private authService = inject(AuthService);

  credentials = { email: '', password: '' };
  isLoading = false;
  errorMessage = '';

  onSubmit(): void {
    if (!this.credentials.email || !this.credentials.password) return;

    this.isLoading = true;
    this.errorMessage = '';

    this.authService.login(this.credentials).subscribe({
      next: () => {
        this.isLoading = false;
        this.authService.redirectByRole();
      },
      error: (err: HttpErrorResponse) => {
        this.isLoading = false;
        this.errorMessage =
          err.error?.message || err.error?.error || 'Login failed. Please check credentials.';
      },
    });
  }
}