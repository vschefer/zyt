import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  isAdmin: Boolean;

  constructor() { }

  admin() {
    const helper = new JwtHelperService();
    const token = JSON.parse(localStorage.getItem('currentUser')).token;
    const decodedToken = helper.decodeToken(token);
    
    this.isAdmin = decodedToken.admin;
  }

  ngOnInit() {
    this.admin();
  }

}
