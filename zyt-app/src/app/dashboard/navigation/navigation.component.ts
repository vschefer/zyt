import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserService } from '../../_services';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  me
  isAdmin: Boolean;
  
  constructor(private userService: UserService) { }
  
  admin() {
    this.userService.getMe().subscribe((response) => {
      this.me = response; 
      this.isAdmin = this.me.admin;
    },
    (error) => console.log(error)) 
  }
  
  openSubNav(e){
    let element = e.target
    let elementClass = e.srcElement.classList[0]
    this.closeSubNav(elementClass)
    element.classList.add('navigation__open-subnav')
    
    
    
  }
  closeSubNav(elem){
    let allButtons = document.querySelectorAll('.'+elem)
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
