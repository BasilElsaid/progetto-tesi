import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { User } from '../../../auth/models/user.model';
import { CompanyService } from '../../../company/services/company.service';


@Component({
  selector: 'app-admin-profile-pending',
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-profile-pending.component.html',
  styleUrl: './admin-profile-pending.component.css',
})
export class AdminProfilePendingComponent implements OnInit {
  companies: User[] = [];

  constructor(private companyService: CompanyService) {}

  ngOnInit(): void {
    this.loadPending();
  }

  loadPending() {
    this.companyService.getCompanies().subscribe({
      next: (data) => {
        this.companies = data.filter(
          (c) => c.profileUpdatePending === true,
        );
      },
    });
  }

  approveProfile(id: string) {
    this.companyService.approveProfile(id).subscribe({
      next: () => this.loadPending(),
    });
  }

  rejectProfile(id: string) {
    this.companyService.rejectProfile(id).subscribe({
      next: () => this.loadPending(),
    });
  }
}