import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../../core/auth/services/auth';
import { AuthRegisterPayload } from '../../../core/auth/models/auth.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private authService = inject(AuthService);
  private router = inject(Router);

  name = '';
  email = '';
  phone = '';
  password = '';

  message = signal<string>('');
  error = signal<string>('');
  isLoading = signal<boolean>(false);

  onRegister(): void {
    this.message.set('');
    this.error.set('');
    this.isLoading.set(true);

    const payload: AuthRegisterPayload = {
      name: this.name.trim(),
      email: this.email.trim().toLowerCase(),
      phone: this.phone.trim(),
      password: this.password,
    };

    this.authService.register(payload).subscribe({
      next: () => {
        // Register returns no token, so log in automatically
        this.authService
          .login({ email: payload.email, password: payload.password })
          .subscribe({
            next: () => {
              this.isLoading.set(false);
              this.authService.redirectByRole(); // new user is GUEST -> /onboarding
            },
            error: () => {
              this.isLoading.set(false);
              this.message.set('Account created. Please log in.');
              this.router.navigate(['/auth/login']);
            },
          });
      },
      error: (err: HttpErrorResponse) => {
        this.isLoading.set(false);
        this.error.set(
          err.error?.errors?.[0]?.message ||
            err.error?.message ||
            'Signup failed. Please try again.'
        );
      },
    });
  }
}