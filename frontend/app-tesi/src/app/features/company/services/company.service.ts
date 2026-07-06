import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { User } from '../../auth/models/user.model';


@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  private apiUrl = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) {}

  getCompanies(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}?role=COMPANY`);
  }

  getMe(): Observable<User> {
    const token = localStorage.getItem('token');

    return this.http.get<User>(`${this.apiUrl}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  deleteCompany(id: string) {
    const token = localStorage.getItem('token');

    return this.http.delete(`${this.apiUrl}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  deleteMe() {
    const token = localStorage.getItem('token');

    return this.http.delete(`${this.apiUrl}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  updateMe(data: any) {
    const token = localStorage.getItem('token');

    return this.http.patch<User>(`${this.apiUrl}/me`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  approveProfile(id: string) {
    return this.http.patch(
      `${this.apiUrl}/${id}/approve-profile`,
      {},
      this.authHeader(),
    );
  }

  rejectProfile(id: string) {
    return this.http.patch(
      `${this.apiUrl}/${id}/reject-profile`,
      {},
      this.authHeader(),
    );
  }

  private authHeader() {
    const token = localStorage.getItem('token');

    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  }
}
