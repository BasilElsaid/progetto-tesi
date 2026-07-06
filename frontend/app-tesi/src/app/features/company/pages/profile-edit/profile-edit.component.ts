import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { User } from '../../../auth/models/user.model';
import { CompanyService } from '../../services/company.service';


@Component({
  selector: 'app-profile-edit',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './profile-edit.component.html',
  styleUrl: './profile-edit.component.css',
})
export class ProfileEditComponent implements OnInit {
  registerForm!: FormGroup;
  company!: User;
  originalValues: any;

  constructor(
    private fb: FormBuilder,
    private companyService: CompanyService,
    private router: Router,
  ) {
    // 🔥 Inizializziamo subito il form per evitare errori template
    this.registerForm = this.fb.group({
      email: [{ value: '', disabled: true }],
      companyName: [{ value: '', disabled: true }],

      companyEmail: ['', [Validators.required, Validators.email]],
      companyPhone: ['', [Validators.pattern(/^[0-9+\-\s]{8,15}$/)]],
      companyAddress: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadCompany();
  }

  loadCompany() {
    this.companyService.getMe().subscribe({
      next: (data) => {
        this.company = data;

        this.registerForm.patchValue({
          email: data.email,
          companyName: data.companyName,
          companyEmail: data.companyEmail,
          companyPhone: data.companyPhone,
          companyAddress: data.companyAddress,
        });

        // 🔥 Salviamo stato originale
        this.originalValues = this.registerForm.getRawValue();
      },
    });
  }

  save() {
    if (this.registerForm.invalid) return;

    const payload = this.registerForm.getRawValue();

    this.companyService.updateMe(payload).subscribe({
      next: () => {
        alert('Richiesta mandata con successo');

        // 🔥 Torna al profilo invece che alla dashboard
        this.router.navigate(['company/profile']);
      },
      error: (err) => {
        alert('Errore nella richiesta');
        console.error('Errore aggiornamento profilo', err);
      },
    });
  }

  isFormChanged(): boolean {
    const current = this.normalize(this.registerForm.getRawValue());
    const original = this.normalize(this.originalValues);

    return JSON.stringify(current) !== JSON.stringify(original);
  }

  private normalize(obj: any) {
    return Object.keys(obj).reduce((acc: any, key) => {
      acc[key] = typeof obj[key] === 'string' ? obj[key].trim() : obj[key];

      return acc;
    }, {});
  }
}
