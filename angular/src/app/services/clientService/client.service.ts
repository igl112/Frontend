import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthService } from '../authService/auth.service';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private authService = inject(AuthService);
  private fb = inject(NonNullableFormBuilder); // Usamos NonNullableFormBuilder para garantizar que los valores nunca sean null o undefined.
  private router = inject(Router);
  //Urls
  url = 'http://localhost:8001/customers';
  //headers

  headers = new HttpHeaders();

  constructor(private http: HttpClient) {
    this.authService.getCsrfToken().subscribe((res: any) => {
      this.headers = new HttpHeaders({
        'X-CSRF-TOKEN': res.csrf_token,
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('authToken')
      });
    });
  }

  getClients(parameters: Array<any>) {
    let fullURL = 
    `${this.url}?nombre=${parameters[0]}&apellidos=${parameters[1]}&tlf=${parameters[2]}&DNI=${parameters[3]}&skip=${parameters[5]}&take=10`;
    console.log(fullURL);
    console.log(parameters.toString());
    return this.http.get(fullURL, {
      headers: this.headers,
    });
  }

  getClient(id: number) {
    return this.http.get(this.url + '/' + id, {
      headers: this.headers,
      withCredentials: true,
    });
  }

  deleteClient(id: number) {
    return this.http.delete(this.url + '/' + id, {
      headers: this.headers,
      withCredentials: true,
    });
  }

  update(id: number, updateData: Object) {
    console.log(updateData);

    return this.http.put(this.url + '/' + id, updateData, {
      headers: this.headers,
      withCredentials: true,
    });
  }
}
