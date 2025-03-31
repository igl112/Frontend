import { Component, HostListener, signal, OnInit, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../paginas/private/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isMenuOpen = signal(false);
  private authService = inject(AuthService);
  private router = inject(Router);

  // Acceso directo a las señales del servicio
  user = this.authService.currentUser;
  isAuthenticated = this.authService.currentUser; // Usamos la misma señal para autenticación

  constructor() {}


  get userName(): string {
    return this.user()?.nombreUsuario || 'Invitado';
  }

  toggleMenu(): void {
    this.isMenuOpen.update(value => !value);
  }

  @HostListener('document:click', ['$event'])
  closeMenu(event: Event): void {
    if (!(event.target as HTMLElement).closest('.dropdown')) {
      this.isMenuOpen.set(false);
    }
  }

  navigateToProfile(): void {
    this.isMenuOpen.set(false);
    this.router.navigate(['/perfil']);
  }
}