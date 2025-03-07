import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map,Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseURL = 'http://localhost:8001/login'; //Aquí va la url

  router = inject(Router);

  http = inject(HttpClient);

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseURL}/login`, credentials);
  }


  refreshToken(): Observable<string> {
    const refreshToken = localStorage.getItem('refreshToken');

    if(!refreshToken) {
      this.logOut();
      return throwError(() => new Error('No refresh token found'));
    }

    return this.http
    .post<{ refreshToken: string }>(`${this.baseURL}/token`, {refreshToken})
    .pipe(
      map(response => response.refreshToken),
      tap((newAccesToken) => {
        localStorage.setItem('token', newAccesToken);
    }), catchError ( error => {
      this.logOut();
      return throwError(() => error)
    }))
  }

  logOut() {
    localStorage.clear();
    this.router.navigateByUrl('/login'); //Si no funciona usar this.router.navigate('/login')
  }
  constructor() { }
}
