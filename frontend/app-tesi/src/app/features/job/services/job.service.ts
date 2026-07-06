import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Job } from '../models/job.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  private apiUrl = `${environment.apiUrl}/jobs`;

  constructor(private http: HttpClient) {}

  getJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(this.apiUrl);
  }

  getJobById(id: string): Observable<Job> {
    return this.http.get<Job>(`${this.apiUrl}/${id}`);
  }

  getMyJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(`${this.apiUrl}/mine`);
  }

  createJob(job: any): Observable<any> {
    return this.http.post(this.apiUrl, job);
  }

  deleteJob(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  approveJob(id: string) {
    const token = localStorage.getItem('token');

    return this.http.patch(
      `${this.apiUrl}/${id}/approve`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }

  getAllJobsForAdmin(): Observable<Job[]> {
    const token = localStorage.getItem('token');

    return this.http.get<Job[]>(`${this.apiUrl}/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  renewJob(jobId: string) {
    return this.http.patch(`${this.apiUrl}/${jobId}/renew`, {});
  }
}
