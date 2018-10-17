import { Component, OnInit } from '@angular/core';
// import {AuthService} from '../auth.service'
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit() {
  }

  loginUser(event){
    event.preventDefault()
    console.log(event)
    const target = event.target;
    const username = target[0].value
    const password = target[1].value
    console.log(username , password)

    // this.Auth.getUserDetails(username, password)
  }
  onLogin() {
    localStorage.setItem('isLoggedin', 'true');
    this.router.navigate(['/home']);
}
}
