import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthResponse, AuthService } from '../../../core/services/api';
import { AuthRegisterPayload } from '../../../core/auth/services/auth';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css'
})

export class Register {
  private authService = inject(AuthService);
  private router = inject(Router);

  // Form Fields matching Prisma User schema
  name = '';
  email = '';
  phone = '';
  password = '';

  // UI Reactive State
  message = signal<string>('');
  error = signal<string>('');
  isLoading = signal<boolean>(false);

  onRegister(): void {
    this.message.set('');
    this.error.set('');
    this.isLoading.set(true);

    const payload: AuthRegisterPayload = {
      name: this.name,
      email: this.email,
      phone: this.phone.trim(), // Send undefined if empty
      password: this.password
    };
    
    //updated service call to register
    this.authService.register(payload).subscribe({
      next: (res:AuthResponse) => {
        this.isLoading.set(false);
        this.message.set(res.message ||'Account created successfully! Setting up your group profile...');
        
        // Auto-login or store temporary guest state if returned by backend API
        if (res.data?.token) {
          localStorage.setItem('token', res.data.token);
        }
        if (res.data?.user?.role) {
          localStorage.setItem('role', res.data.user.role);
        }

        // Redirect to onboarding page after 1.5 seconds
        setTimeout(() =>{
          this.router.navigate(['/onboarding']);
        }, 1500);
      },
      error: (err: HttpErrorResponse) => {
      this.isLoading.set(false);
      // Fallback handles both HTTP error payloads and raw network errors
      const errorMessage = err.error?.message || err.message || 'Signup failed. Please try again.';
      this.error.set(errorMessage);
    }
    });
  }
}




//.....


// import { Component, inject } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { Router, RouterLink } from '@angular/router';

// @Component({
//   selector: 'app-signup',
//   standalone: true,
//   imports: [CommonModule, FormsModule, RouterLink],
//   templateUrl: './signup.html',
//   styleUrl: './signup.css'
// })
// export class Signup {
//   fullName = '';
//   phone = '';
//   groupCode = '';
//   password = '';

//   private router = inject(Router);

//   onSignup() {
//     // 1. Save user registration draft state
//     const pendingUser = {
//       fullName: this.fullName,
//       phone: this.phone,
//       groupCode: this.groupCode.toUpperCase(),
//       status: 'PENDING'
//     };
    
//     localStorage.setItem('pendingUser', JSON.stringify(pendingUser));

//     // 2. Direct user to Pending Approval screen
//     this.router.navigate(['/auth/approval-pending']);
//   }
// }




