import { Component, OnInit, Input, HostBinding } from '@angular/core';
import {SideBarService} from '../todo-detail/todo-detail.service'
@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.scss']
})
export class TodoDetailComponent implements OnInit {
  @HostBinding('class.is-open')
  isOpen = false;

  constructor(
    private sideBarService: SideBarService
  ) { }

  ngOnInit() {
    this.sideBarService.change.subscribe(isOpen => {
      this.isOpen = isOpen;
    });
  }

}