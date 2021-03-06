import { Component, OnInit, Input, HostBinding, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import {UpdateButtonTodoComponent} from '../todo-list/update-button/update-button.component'
import {MatDialog} from '@angular/material';
import { TodoService } from '../../../_services/todo.service';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.scss']
})
export class TodoDetailComponent extends UpdateButtonTodoComponent implements OnInit {
  public id: Object
  public projId: Object
  project: Object
  todos : Object
  todo: Object
  briefing:Array<String>;
  selectStatus
  update
  state
  constructor(
    private todoService: TodoService,
    public dialog: MatDialog,@Inject(MAT_DIALOG_DATA) private data: { id: Object }, 
    private mdDialogRef: MatDialogRef<TodoDetailComponent>) { 
      super(dialog)
    }
    
    bleh() {
      this.todoService.getTodo(this.data.id).subscribe((response) => {
        this.todo = response; 
      },
      (error) => console.log(error)
    )
  }
  
  updateState(){
    let nextButton = document.querySelector('.next')
    let prevButton = document.querySelector('.prev')
    let wrapper = document.querySelector('.wrapper')
    
    this.update={
      status: this.selectStatus,
    }
    this.todoService.updateTodo(this.update, this.data.id).subscribe()
    window.location.reload()
  }
  ngOnInit() {
    this.bleh()
  }
  
}