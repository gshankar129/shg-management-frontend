import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth/services/auth';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private auth = inject(AuthService);

  isLoggedIn = this.auth.isLoggedIn();
  dashboardLink = this.auth.getHomeRoute(this.auth.getRole());
}