import { Routes } from '@angular/router';
import { roleGuard } from './core/guards/role.guard';
import { AdminCompaniesComponent } from './features/admin/pages/admin-companies/admin-companies.component';
import { AdminJobsComponent } from './features/admin/pages/admin-jobs/admin-jobs.component';
import { AdminProfilePendingComponent } from './features/admin/pages/admin-profile-pending/admin-profile-pending.component';
import { AdminComponent } from './features/admin/pages/admin/admin.component';
import { LoginComponent } from './features/auth/pages/login/login.component';
import { RegisterComponent } from './features/auth/pages/register/register.component';
import { CreateJobComponent } from './features/company/pages/create-job/create-job.component';
import { DashboardComponent } from './features/company/pages/dashboard/dashboard.component';
import { ProfileEditComponent } from './features/company/pages/profile-edit/profile-edit.component';
import { ProfileComponent } from './features/company/pages/profile/profile.component';
import { HomeComponent } from './features/home/pages/home/home.component';
import { JobDetailComponent } from './features/job/pages/job-detail/job-detail.component';
import { JobsComponent } from './features/job/pages/jobs/jobs.component';


export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },

  {
    path: 'auth',
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
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
        component: AdminComponent,
      },
      {
        path: 'jobs',
        component: AdminJobsComponent,
      },
      {
        path: 'companies',
        component: AdminCompaniesComponent,
      },
      {
        path: 'profile-pending',
        component: AdminProfilePendingComponent,
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
        component: DashboardComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'profile-edit',
        component: ProfileEditComponent,
      },
      {
        path: 'create-job',
        component: CreateJobComponent,
      },
    ],
  },

  {
    path: 'jobs',
    children: [
      {
        path: '',
        component: JobsComponent,
      },
      {
        path: ':id',
        component: JobDetailComponent,
      },
    ],
  },

  {
    path: '**',
    redirectTo: '',
  },
];