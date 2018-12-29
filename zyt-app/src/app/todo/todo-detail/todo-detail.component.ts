import { Component, OnInit, Input, HostBinding, Inject } from '@angular/core';
import { ServerService } from '../../server.service';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import {UpdateButtonTodoComponent} from '../todo-list/update-button/update-button.component'
import {MatDialog} from '@angular/material';

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
    private serverService: ServerService,
    public dialog: MatDialog,@Inject(MAT_DIALOG_DATA) private data: { id: Object }, 
    private mdDialogRef: MatDialogRef<TodoDetailComponent>) { 
      super(dialog)
    }
    
    bleh() {
      this.serverService.getAll('http://localhost:9000/api/todos/' + this.data.id).subscribe((response) => {
      this.todo = response.json();
      
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
  
  this.serverService.put('http://localhost:9000/api/todos/' + this.data.id, this.update).subscribe(
  (response)=> console.log(response),
)

}
ngOnInit() {
  this.bleh()
}

}