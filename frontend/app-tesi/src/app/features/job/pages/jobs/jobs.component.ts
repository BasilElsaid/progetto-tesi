import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Job } from '../../models/job.model';
import { JobService } from '../../services/job.service';


@Component({
  selector: 'app-jobs',
  imports: [
    NgFor,
    NgIf,
    RouterModule,
  ],
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.css',
})
export class JobsComponent implements OnInit {
  jobs: Job[] = [];
  loading = true;

  constructor(
    private jobService: JobService,
  ) {}

  ngOnInit() {
    console.log('🟢 COMPONENTE CARICATO');

    this.jobService.getJobs().subscribe({
      next: (res: any) => {
        console.log('🔥 JOBS:', res);

        this.jobs = res; // ✅ SALVIAMO I DATI
        this.loading = false;
      },
      error: (err) => {
        console.error('❌ ERRORE:', err);
        this.loading = false;
      },
    });
  }
}
