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

  openSubNav(e){
  let element = e.target
  let elementClass = e.srcElement.classList[0]
  console.log(elementClass)
  this.closeSubNav(elementClass)
  element.classList.add('navigation__open-subnav')
  


  }
  closeSubNav(elem){
    let allButtons = document.querySelectorAll('.'+elem)
    console.log(allButtons)
    const nodesArray = Array.prototype.slice.call(allButtons);
    nodesArray.forEach(element => {
      if(element.classList.contains('navigation__open-subnav')){
        element.classList.remove('navigation__open-subnav')
      }
    });
  }

  ngOnInit() {
    this.admin();
  }

}
