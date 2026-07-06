import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Job, JobStatus } from '../../../job/models/job.model';
import { JobService } from '../../../job/services/job.service';


type JobWithUI = Job & {
  expanded?: boolean;
};

@Component({
  selector: 'app-admin-jobs',
  imports: [
    CommonModule,
    RouterModule,
  ],
  templateUrl: './admin-jobs.component.html',
  styleUrl: './admin-jobs.component.css',
})
export class AdminJobsComponent implements OnInit {
  jobs: JobWithUI[] = [];

  statusMap: Record<JobStatus, string> = {
    PENDING: 'In Attesa',
    APPROVED: 'Approvato',
  };

  constructor(private jobService: JobService) {}

  ngOnInit(): void {
    this.loadJobs();
  }

  loadJobs() {
    this.jobService.getAllJobsForAdmin().subscribe({
      next: (data) => {
        this.jobs = data;
      },
      error: (err) => console.error('Errore caricamento jobs:', err),
    });
  }

  approveJob(id: string) {
    this.jobService.approveJob(id).subscribe({
      next: () => this.loadJobs(),
    });
  }

  deleteJob(id: string) {
    if (!confirm('Sei sicuro di voler eliminare questo annuncio?')) return;

    this.jobService.deleteJob(id).subscribe({
      next: () => this.loadJobs(),
    });
  }

  toggleDescription(job: JobWithUI) {
    job.expanded = !job.expanded;
  }

  isExpired(date: Date | string): boolean {
    if (!date) return false;

    return new Date(date).getTime() < new Date().getTime();
  }
}
