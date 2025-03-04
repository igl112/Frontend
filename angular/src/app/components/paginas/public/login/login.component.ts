import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


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
    http = inject(HttpClient)

    onLogin() {
      debugger;
      /*if(this.loginObj.username == "admin" && this.loginObj.password == "1122") {
        this.router.navigateByUrl("admin")
      } else {
        alert("Wrong credentials")
      } */
      this.http.get("http://localhost:8001/login").subscribe((res:any)=> {
        debugger;
        console.log(res)
        //localStorage.setItem("angular19user",res.data.userId)
        this.router.navigateByUrl("admin")
      }, errors=>{
        alert("Wrong credentials.");
      })
    }
}
