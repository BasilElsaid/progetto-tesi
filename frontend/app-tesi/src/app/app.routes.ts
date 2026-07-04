import { Routes } from '@angular/router';
import { roleGuard } from './core/guards/role.guard';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/home/home.component').then((m) => m.HomeComponent),
      },

      {
        path: 'auth',
        children: [
          {
            path: '',
            redirectTo: 'login',
            pathMatch: 'full',
          },
          {
            path: 'login',
            loadComponent: () =>
              import('./pages/authPages/login/login.component').then(
                (m) => m.LoginComponent,
              ),
          },
          {
            path: 'register',
            loadComponent: () =>
              import('./pages/authPages/register/register.component').then(
                (m) => m.RegisterComponent,
              ),
          },
        ],
      },

      {
        path: 'admin',
        canActivate: [roleGuard],
        data: { role: 'ADMIN' },
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./pages/adminPages/admin/admin.component').then(
                (m) => m.AdminComponent,
              ),
          },
          {
            path: 'jobs',
            loadComponent: () =>
              import('./pages/adminPages/admin-jobs/admin-jobs.component').then(
                (m) => m.AdminJobsComponent,
              ),
          },
          {
            path: 'companies',
            loadComponent: () =>
              import('./pages/adminPages/admin-companies/admin-companies.component').then(
                (m) => m.AdminCompaniesComponent,
              ),
          },
          {
            path: 'profile-pending',
            loadComponent: () =>
              import('./pages/adminPages/admin-profile-pending/admin-profile-pending.component').then(
                (m) => m.AdminProfilePendingComponent,
              ),
          },
        ],
      },

      {
        path: 'company',
        canActivate: [roleGuard],
        data: { role: 'COMPANY' },
        children: [
          {
            path: '',
            redirectTo: 'dashboard',
            pathMatch: 'full',
          },
          {
            path: 'dashboard',
            loadComponent: () =>
              import('./pages/companyPages/dashboard/dashboard.component').then(
                (m) => m.DashboardComponent,
              ),
          },
          {
            path: 'profile',
            loadComponent: () =>
              import('./pages/companyPages/profile/profile.component').then(
                (m) => m.ProfileComponent,
              ),
          },
          {
            path: 'profile-edit',
            loadComponent: () =>
              import('./pages/companyPages/profile-edit/profile-edit.component').then(
                (m) => m.ProfileEditComponent,
              ),
          },
          {
            path: 'create-job',
            loadComponent: () =>
              import('./pages/companyPages/create-job/create-job.component').then(
                (m) => m.CreateJobComponent,
              ),
          },
        ],
      },

      {
        path: 'jobs',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./pages/jobsPages/jobs/jobs.component').then(
                (m) => m.JobsComponent,
              ),
          },
          {
            path: ':id',
            loadComponent: () =>
              import('./pages/jobsPages/job-detail/job-detail.component').then(
                (m) => m.JobDetailComponent,
              ),
          },
        ],
      },

      {
        path: '**',
        redirectTo: '',
      },
    ],
  },
];
