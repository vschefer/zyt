import { Directive,Component, OnInit, Input, Output,ElementRef, EventEmitter, HostListener } from '@angular/core';
import {SideBarService} from '../todo-detail/todo-detail.service'
@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
@Directive({
  selector: '[toggleDetail]',
})
export class TodoListComponent implements OnInit {
  windowWidth = document.body.clientWidth;
  spalte = this.windowWidth
  constructor(private sideBarService: SideBarService) {
    
  }

  tog(){
    this.sideBarService.toggle();
    let wrapper = document.querySelector('.wrapper') as HTMLElement;
    let body = document.querySelector('body')
    wrapper.classList.toggle('open')
    body.classList.toggle('open')
    if(document.querySelector('.open')){
     wrapper.style.width = this.spalte -300 + 'px';
      wrapper.style.overflowX = 'scroll';
      console.log(this.spalte * 4 + 'px')
    }else{
      document.body.style.width = '100vw'
      document.body.style.overflowX = 'hidden'
    }
}

  ngOnInit() {
  }

}