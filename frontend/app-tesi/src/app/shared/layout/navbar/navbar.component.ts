import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  open = false;

  constructor(
    public authService: AuthService,
    public router: Router,
  ) {}

  get isAdmin() {
    return this.authService.role;
  }

  get isAuth() {
    return this.authService.isAuthenticated;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['']);
  }
}
