import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/authService/auth.service';
@Component({
  selector: 'app-header',
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  authservice = inject(AuthService);

  logout() {
    this.authservice
      .logout(localStorage.getItem('authToken') || '')
      .subscribe((res: any) => {
        localStorage.removeItem('authToken')
      });
  }
}
