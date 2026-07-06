import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) return;

    this.errorMessage = null; // reset errore

    this.authService.loginApi(this.loginForm.value).subscribe({
      next: (res) => {
        this.authService.login(res);
      },
      error: (err) => {
        console.error('Login fallito', err);

        // 🔴 Messaggio errore visibile
        this.errorMessage = err.error?.message || 'Credenziali non valide';
      },
    });
  }

  logout() {
    this.authService.logout();
  }
}
