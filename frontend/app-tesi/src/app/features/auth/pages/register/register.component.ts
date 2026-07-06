import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
} from '@angular/forms';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    NgIf,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/company/dashboard']);
    }

    this.registerForm = this.fb.group(
      {
        // ACCOUNT
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern(/^(?=.*[A-Z])(?=.*[0-9]).*$/),
          ],
        ],
        confirmPassword: ['', Validators.required],

        // COMPANY DATA
        companyName: ['', Validators.required],
        companyEmail: ['', [Validators.required, Validators.email]],
        companyPhone: [
          '',
          [Validators.required, Validators.pattern(/^[0-9+\-\s]{8,15}$/)],
        ],
        companyAddress: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator },
    );
    // 🔥 Forza ricalcolo quando cambia password o confirmPassword
    this.registerForm.get('password')?.valueChanges.subscribe(() => {
      this.registerForm.updateValueAndValidity();
    });

    this.registerForm.get('confirmPassword')?.valueChanges.subscribe(() => {
      this.registerForm.updateValueAndValidity();
    });
    this.registerForm.get('email')?.valueChanges.subscribe(() => {
      const emailControl = this.registerForm.get('email');
      if (emailControl?.hasError('emailTaken')) {
        const errors = { ...emailControl.errors };
        delete errors['emailTaken'];
        emailControl.setErrors(Object.keys(errors).length ? errors : null);
      }
    });
  }

  passwordMatchValidator = (form: AbstractControl) => {
    const password = form.get('password')?.value;
    const confirm = form.get('confirmPassword')?.value;

    return password && confirm && password !== confirm
      ? { mismatch: true }
      : null;
  };

  onSubmit() {
    if (this.registerForm.invalid) return;

    const formData = this.registerForm.value;

    // Rimuoviamo confirmPassword prima di inviare al backend
    delete formData.confirmPassword;

    // Impostiamo il ruolo automaticamente come COMPANY
    formData.role = 'COMPANY';

    this.authService.register(formData).subscribe({
      next: () => {
        this.authService
          .loginApi({
            email: formData.email,
            password: formData.password,
          })
          .subscribe((loginRes) => {
            this.authService.login(loginRes);
            this.router.navigate(['/company/dashboard']);
          });
      },
      error: (err) => {
        console.error('Errore registrazione:', err);

        if (
          err.status === 400 &&
          err.error?.message === 'Email già registrata'
        ) {
          this.registerForm.get('email')?.setErrors({ emailTaken: true });
          return;
        }
      },
    });
  }

  getPasswordError(): string | null {
    const control = this.registerForm.get('password');
    if (!control?.errors) return null;

    if (control.hasError('required')) return 'Password obbligatoria';
    if (control.hasError('minlength')) return 'Minimo 8 caratteri';
    if (control.hasError('pattern'))
      return 'Deve contenere almeno 1 maiuscolo e 1 numero';

    return null;
  }
}
