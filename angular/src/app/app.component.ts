import { Component, OnInit } from '@angular/core';
import { provideRouter, RouterLink, RouterOutlet} from '@angular/router';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { AuthService } from './paginas/private/services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'angular';
  constructor(private authService: AuthService) {}
}
