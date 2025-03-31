import { HttpClient, HttpHeaders } from '@angular/common/http';
import { effect, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { catchError, map, mergeMap, tap, throwError, of } from 'rxjs';

//Usamos interface user para declarar los tipados
interface Usuario {
  id: number;
  nombre: string;
  nombreUsuario: string;
  email: string;
  contrasena: string;
  created_at: string;
  updated_at: string;
  cliente?: Cliente;
}

interface Cliente {
  usuario_id: number;
  apellidos: string;
  tlf: number;
  direccion: string;
  municipio: string;
  provincia: string;
  dni: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseURL = 'http://localhost:8001';
  registerURL = 'http://localhost:8001/register';
  loginUrl = 'http://localhost:8001/login';

  private readonly TOKEN_KEY = 'auth_token';
  token = signal<string | null>(null);

  currentUser = signal<Usuario | null>(null);
  isAuthenticated = signal(false);

  router = inject(Router);
  http = inject(HttpClient);

  constructor() {
    // Inicializar desde localStorage
    const savedToken = localStorage.getItem(this.TOKEN_KEY);
    this.token.set(savedToken);

    // Persistir cambios automáticamente
    effect(() => {
      const currentToken = this.token();
      currentToken 
        ? localStorage.setItem(this.TOKEN_KEY, currentToken)
        : localStorage.removeItem(this.TOKEN_KEY);
    });
  }

  saveToken(token: string): void {
    this.token.set(token);
  }

  clearToken(): void {
    this.token.set(null);
  }

  //Obtener el token
  getCsrfToken(): Observable<{ csrf_token: string }> {
    return this.http.get<{ csrf_token: string }>('http://localhost:8001/sanctum/csrf-cookie', {
      withCredentials: true 
    });
  }

  // Login
  login(credentials: { email: string; contrasena: string }): Observable<any> {
    return this.getCsrfToken().pipe(
      mergeMap((response) => {
        const headers = new HttpHeaders({
          'X-CSRF-TOKEN': response.csrf_token,
          'Content-Type': 'application/json',
        });

       return this.http.post<{ token: string }>(this.loginUrl, credentials, {
          withCredentials: true, 
          headers: headers,
        });
      }),
      tap((loginResponse) => {
        this.token.set(loginResponse.token), // Guardar token via signal
        this.router.navigate(['/inicio']);
      }),
      catchError((error) => {
        this.token.set(null);
        console.error('Error en el login:', error);
        return throwError(() => new Error(error));
      })
    );
  }

  

  // Registro
  register(credentials: { nombre: string, nombreUsuario: string, email: string, contrasena: string, contrasena_confirmation: string }): Observable<any> {
    return this.getCsrfToken().pipe(
      mergeMap((response) => {
        const headers = new HttpHeaders({
          'X-CSRF-TOKEN': response.csrf_token,
          'Content-Type': 'application/json',
        });

        return this.http.post(this.registerURL, credentials, {
          withCredentials: true,
          headers: headers,
        });
      }),
      catchError((error) => {
        console.error('Error en el registro:', error);
        return throwError(() => new Error(error));
      })
    );
  }

  /*logout(): Observable<any> {
    return this.getCsrfToken().pipe(
      mergeMap((response) => {
        const headers = new HttpHeaders({
          'X-CSRF-TOKEN': response.csrf_token,
          'Content-Type': 'application/json',
        });
  
        return this.http.post(`${this.baseURL}/logout`, {}, {
          withCredentials: true,
          headers: headers
        }).pipe(
          tap(() => {
            // Limpiar datos del cliente
            //localStorage.removeItem('usuario_actual'); // Si almacenas datos de usuario
            this.router.navigate(['/login']);
          })
        );
      }),
      catchError((error) => {
        console.error('Error en el logout:', error);
        return throwError(() => new Error(error));
      })
    );
  }*/

  // Obtener usuario autenticado
  getUser(): Observable<any> {
    return this.http.get(`${this.baseURL}/getUser`).pipe(
      tap((response: any) => {
        if (response.success) {
          this.currentUser.set(response.user);
          // Almacenar token si es necesario
          if (response.token) {
            localStorage.setItem('access_token', response.token);
          }
        }
      }),
      catchError((error) => {
        if (error.status === 401) {
          this.clearAuthData();
          this.router.navigate(['/login']);
        }
        return throwError(() => error);
      })
    );
  }
  // Obtener datos de usuario (para uso en componentes)
  get userData() {
    return this.currentUser();
  }

  private clearAuthData(): void {
    localStorage.removeItem('access_token');
    this.currentUser.set(null);
  }

  // Método para obtener el nombre de usuario
  get userName(): string | null {
    return this.currentUser()?.nombre || null;
  }
}