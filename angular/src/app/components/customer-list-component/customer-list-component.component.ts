import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { AuthService } from '../../paginas/private/services/auth.service';
import { catchError, mergeMap, Observable, throwError } from 'rxjs';

@Component({
  selector: 'app-customer-list-component',
  imports: [],
  templateUrl: './customer-list-component.component.html',
  styleUrl: './customer-list-component.component.css',
})
export class CustomerListComponentComponent {
  //Urls
  urls = ['http://localhost:8001', 'http://localhost:8001/customers'];
  //lista de clientes
  clientlist: any[] = [];
  private authService = inject(AuthService);
  headers = new HttpHeaders();

  constructor(private http: HttpClient) {
    this.authService.getCsrfToken().subscribe((res: any) => {
      this.headers = new HttpHeaders({
        'X-CSRF-TOKEN': res.csrf_token,
        'Content-Type': 'application/json',
      });
    });
  }

  getClients() {
    this.http
      .get(this.urls[1], { headers: this.headers })
      .subscribe((res: any) => {
        this.clientlist = res;
      });
  }

  deleteClient(id: number) {
    console.log(this.headers)
    this.http
      .delete(this.urls[1] + '/' + id, { headers: this.headers })
      .subscribe((res: any) => {
        console.log(res)
        alert(res.message);
      });
  }
}
/* } */
