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
  spalte = this.windowWidth / 4;
  constructor(private sideBarService: SideBarService) {}

  tog(){
    this.sideBarService.toggle();
    document.querySelector('body').classList.toggle('open')
    
    if(document.querySelector('.open')){
      document.body.style.width = this.spalte * 5 + 'px';
      document.body.style.overflowX = 'scroll';
    }else{
      document.body.style.width = '100vw'
      document.body.style.overflowX = 'hidden'
    }
}

  ngOnInit() {
  }

}