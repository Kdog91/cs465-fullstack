import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../models/user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  public formError: string = '';

  credentials = {
    email: '',
    password: ''
  };

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  public onLoginSubmit(): void {
    this.formError = '';
    if (!this.credentials.email || !this.credentials.password) {
      this.formError = 'Email and password are required, please try again';
      return;
    }
    this.doLogin();
  }

  private doLogin(): void {
    const user = { email: this.credentials.email, name: '' } as User;
    this.authenticationService.login(user, this.credentials.password).subscribe({
      next: () => this.router.navigate(['']),
      error: (err: any) => {
        console.error(err);
        this.formError = err?.error?.message || 'Login failed, please check your email and password';
      }
    });
  }
}