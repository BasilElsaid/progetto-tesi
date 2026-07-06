import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { User } from '../../../auth/models/user.model';
import { CompanyService } from '../../services/company.service';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  company!: User;

  constructor(
    private companyService: CompanyService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadCompany();
  }

  loadCompany() {
    if (!localStorage.getItem('token')) return;

    this.companyService.getMe().subscribe({
      next: (data) => {
        this.company = data;
      },
      error: () => {
        this.router.navigate(['/auth/login']);
      },
    });
  }

  deleteProfile() {
    const confirmDelete = confirm(
      'Sei sicuro di voler eliminare il profilo? Tutti gli annunci vostri verrano eliminati di conseguenza.',
    );

    if (!confirmDelete) return;

    this.companyService.deleteMe().subscribe({
      next: () => {
        alert('Profilo eliminato con successo');
        localStorage.removeItem('token');
        this.router.navigate(['/auth/login']);
      },
      error: (err) => {
        console.error('Errore eliminazione profilo:', err);
        alert('Errore durante l’eliminazione del profilo');
      },
    });
  }
}
