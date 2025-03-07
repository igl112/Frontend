import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../private/services/auth.service';


@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

    loginObj: any = {
      username: '',
      password: ''
    };

    apiLoginObj: any = {
      "EmailId": "",
      "Password": ""
    };

    router = inject(Router);
    http = inject(HttpClient);
    authService = inject(AuthService);

    onLogin() {
      /*debugger;
      if(this.loginObj.username == "admin" && this.loginObj.password == "1122") {
        this.router.navigateByUrl("admin")
      } else {
        alert("Wrong credentials")
      } */
      /*this.http.post("http://localhost:8001/login", this.loginObj).subscribe((res:any)=> {
        debugger;
        localStorage.setItem("angular19user",res.data.userId)
        this.router.navigateByUrl("admin")
      }, errors=>{
        alert("Wrong credentials.");
      })*/

      this.authService.login(this.loginObj).subscribe(
        response => {
          console.log('Login exitoso:', response);
        },
        error => {
          console.error('Error en el login:', error);
        }
      );
    }
}
