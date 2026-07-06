import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { User } from '../../../auth/models/user.model';
import { JobService } from '../../../job/services/job.service';
import { CompanyService } from '../../services/company.service';


@Component({
  selector: 'app-create-job',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterLink,
  ],
  templateUrl: './create-job.component.html',
  styleUrl: './create-job.component.css',
})
export class CreateJobComponent implements OnInit {
  jobForm: FormGroup;
  company!: User;

  constructor(
    private fb: FormBuilder,
    private jobService: JobService,
    private companyService: CompanyService,
    private router: Router,
  ) {
    this.jobForm = this.fb.group({
      title: ['', Validators.required],
      location: ['', Validators.required],
      type: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(20)]],
      referenceLink: [
        '',
        [Validators.required, Validators.pattern(/https?:\/\/.+/)],
      ],
      expiresAt: ['', [Validators.required, this.min30DaysValidator]],
    });
  }

  ngOnInit(): void {
    this.loadCompany();
  }

  loadCompany() {
    this.companyService.getMe().subscribe({
      next: (data) => {
        this.company = data;
      },
      error: (err) => {
        console.error('Errore caricamento azienda', err);
      },
    });
  }

  onSubmit() {
    if (this.jobForm.invalid) return;

    this.jobService.createJob(this.jobForm.value).subscribe({
      next: () => {
        alert('Richiesta mandata con successo');
        this.router.navigate(['/company/dashboard']);
      },
      error: (err) => {
        alert('Errore nella richiesta');
        console.error('Errore creazione job:', err);
      },
    });
  }

  min30DaysValidator(control: any) {
    if (!control.value) return null;

    const selectedDate = new Date(control.value);
    const today = new Date();

    const minDate = new Date();
    minDate.setDate(today.getDate() + 30);

    if (selectedDate < minDate) {
      return { min30days: true };
    }

    return null;
  }
}
