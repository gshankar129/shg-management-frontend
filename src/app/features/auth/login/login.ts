import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/auth/services/auth';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthResponse } from '../../../core/services/api';

// export interface LoginResponse {
//   role?: 'LEADER' | 'ADMIN' | 'MEMBER' | string;
//   token?: string;
//   message?: string;
// }

@Component({
  selector: 'app-login',
  standalone : true,
  imports: [
    CommonModule, 
    FormsModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private authService = inject(AuthService);

  private router = inject(Router);

    credentials = {
      email: '',
      password: ''
    };

    isLoading = false;
    errorMessage = '';

    onSubmit(): void {
      if (!this.credentials.email || !this.credentials.password) return;

      this.isLoading = true;
      this.errorMessage = '';

      this.authService.login(this.credentials).subscribe({
        next: (res:AuthResponse) => {
          this.isLoading = false;

          // Safely extract role from nested payload
          const role = res.data?.user?.role;
          
          // Redirect based on backend role payload
          if (role === 'LEADER' || role === 'ADMIN') {
            this.router.navigate(['/leader/dashboard']);
          } else if (role === 'MEMBER'){
            this.router.navigate(['/member/dashboard']);
          }else if (role === 'GUEST') {
            this.router.navigate(['/onboarding']);
          }
        },
        error: (err: HttpErrorResponse) => {
          this.isLoading = false;
          this.errorMessage = err.error?.error || err.error?.message || 'Login failed. Please check credentials.';
        }
      });

  // mobile = '';
  // password = '';
  // private router = inject(Router);

  // onLogin() {
  //   // Simulate setting session token
  //   localStorage.setItem('token', 'fake-jwt-token');
  //   // Navigate to member profile after login
  //   this.router.navigate(['/member']);
   }
}
