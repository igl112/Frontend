import { Component, HostListener, signal, OnInit, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../paginas/private/services/auth.service';

@Component({
  selector: 'app-header',
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  isMenuOpen = signal(false);
  private authService = inject(AuthService);
  private router = inject(Router);
  currentUser = this.authService.getUser()
  isAuthenticated = this.authService.isAuthenticated.asReadonly();

  constructor() {}

  ngOnInit(): void {
    this.authService.initializeAuthState();
  }

  get userName(): string {
    return this.authService.userName || 'null';
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.isMenuOpen.set(false);
        this.router.navigate(['/inicio']);
      },
      error: (err) => console.error('Error al cerrar sesión:', err)
    });
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