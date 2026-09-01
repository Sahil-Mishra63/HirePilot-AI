import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  email = '';
  password = '';

  loading = false;
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router){}

  login(): void {

    this.errorMessage = '';

    if (!this.email || !this.password) {
      this.errorMessage = 'Please enter your email and password.';
      return;
    }

    this.loading = true;

    this.authService.login({
      email: this.email,
      password: this.password
    }).subscribe({

      next: () => {
        this.loading = false;

        // Temporary destination.
        // We'll change this to the real dashboard/profile later.
        this.router.navigate(['/profile']);
      },

      error: (error) => {
        this.loading = false;

        console.error('Login error:', error);

        this.errorMessage =
          error?.error?.message ||
          'Invalid email or password.';
      }

    });
  }

}
