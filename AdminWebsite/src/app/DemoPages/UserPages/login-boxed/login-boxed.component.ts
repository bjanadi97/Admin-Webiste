import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login-boxed',
  templateUrl: './login-boxed.component.html',
  styles: []
})
export class LoginBoxedComponent implements OnInit {
  input;

  constructor(private api: ApiService, private router: Router) { 
    this.onLogin();
  }

  ngOnInit() {
    this.input= {
      username:'',
      password:''
    };
  }
  onLogin(){
    this.api.loginAdmin(this.input).subscribe(
      response => {
        console.log(response.token);
        localStorage.setItem('userToken', response.token);
        localStorage.setItem('username', this.input.username);
        this.router.navigate([''])

      },
      error => {
        console.log('error' , error)
      }
    )
  }

}
