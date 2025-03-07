import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError, map, mergeMap, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseURL = 'http://localhost:8001/login'; // Aquí va la url

  router = inject(Router);
  http = inject(HttpClient);

  // Obtén el token CSRF
  getCsrfToken(): Observable<{ csrf_token: string }> {
    return this.http.get<{ csrf_token: string }>('http://localhost:8001/sanctum/csrf-cookie', {
      withCredentials: true // Necesario para que se envíen las cookies
    });
  }
  

  // Login
  login(credentials: { email: string; contrasena: string }): Observable<any> {
    return this.getCsrfToken().pipe(
      mergeMap((response) => {
        // Configura los encabezados para incluir el token CSRF
        const headers = new HttpHeaders({
          'X-CSRF-TOKEN': response.csrf_token,
          'Content-Type': 'application/json',
        });

        // Realiza la solicitud POST con el token CSRF
        return this.http.post(this.baseURL, credentials, {
          withCredentials: true, // Asegúrate de que las cookies sean enviadas
          headers: headers,
        });
      }),
      catchError((error) => {
        console.error('Error en el login:', error);
        return throwError(() => new Error(error));
      })
    );
  }

  constructor() {}
}
