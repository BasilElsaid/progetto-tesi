import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DatePipe, NgIf } from '@angular/common';
import { Job } from '../../models/job.model';
import { JobService } from '../../services/job.service';


@Component({
  selector: 'app-job-detail',
  imports: [
    NgIf,
    DatePipe,
    RouterLink,
  ],
  templateUrl: './job-detail.component.html',
  styleUrl: './job-detail.component.css',
})
export class JobDetailComponent implements OnInit {
  job?: Job;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private jobService: JobService,
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');

      if (!id) {
        this.loading = false;
        return;
      }

      this.jobService.getJobById(id).subscribe({
        next: (data) => {
          this.job = data;
          this.loading = false;
        },
        error: (err) => {
          console.error('Errore caricamento job:', err);
          this.loading = false;
        },
      });
    });
  }

  isExpired(date: Date | string): boolean {
    if (!date) return false;

    return new Date(date).getTime() < new Date().getTime();
  }
}
