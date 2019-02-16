import { Component, OnInit } from '@angular/core';
import * as Charts from 'chart.js'
@Component({
  selector: 'app-mobile-nav',
  templateUrl: './toggle-nav.component.html',
  styleUrls: ['./toggle-nav.component.scss']
})
export class MobileNavComponent implements OnInit {
  constructor() { }



  ngOnInit() {
  }

  toggleMobileNav(e){
    document.body.classList.toggle('mobilenav__open');
    if(!document.body.classList.contains('mobilenav__open')){
      document.body.classList.add('mobilenav__close');
    }else{
      document.body.classList.remove('mobilenav__close');
    }
  }

}
