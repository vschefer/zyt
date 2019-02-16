import { Directive,Component, OnInit, Input, Output,ElementRef, EventEmitter, HostListener } from '@angular/core';
import {MatDialog} from '@angular/material';
import { TodoDetailComponent } from '../todo-detail/todo-detail.component';
import { ProjectService } from '../../../_services/project.service';
import * as moment from 'moment';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  inputs: ['parentData'],
})
@Directive({
  selector: '[toggleDetail]',
})
export class TodoListComponent implements OnInit {
  now = moment().format('YYYY-MM-DD');
  windowWidth = document.body.clientWidth;
  spalte = this.windowWidth
  data
  positions:Array<String>;
  project: Object
  todos : Object
  activeProj
  public id
  public projId
  constructor(
    public dialog: MatDialog, 
    private projectService: ProjectService
  ) {}
  proj:Array<String>;
  todo:Array<String>;
  getProjects() {
    this.projectService.getProjects().subscribe((response) => {
    this.data = response;
    let activeProj =[]
    this.data.forEach(element => {
      if(element.deadline >= this.now){
        activeProj.push(element)
      }
    });
    this.activeProj = activeProj
  },
  (error) => console.log(error)
)
}
toArray(answers: object) {
  return Object.keys(answers).map(key => answers[key])
}

bleh(id) {
  this.projectService.getProject(id).subscribe((response) => {
  let proj = [];
  
  let project = response;
  project['todos'].forEach((user) => {
    proj.push({
      "status": user.status,
      "_id": user._id,
      "briefing": {
        "title": user.briefing.title,
        "description": user.briefing.description
      },
      "assigned_users": [
        {
          "archived": user.assigned_users.archived,
          "_id": user.assigned_users._id,
          "first_name": user.assigned_users.first_name,
          "surname": user.assigned_users.surname
        }
      ],
    });
  });
  this.proj = proj;
},
(error) => console.log(error)
)

}

showDay(event){
  let selected = document.querySelectorAll('.all__todo m')
  let button = event.path[0]
  let weekDays = document.querySelectorAll('.all__todo')
  let growDay = event.path[1]
  let myArray = Array.from(weekDays)
  for(let i = 0; i < weekDays.length; i++){
    weekDays[i].classList.remove('grow')
  }
  if(growDay.classList.contains('grow')){
    growDay.classList.remove('grow')
  }else{
    growDay.classList.add('grow')
  }
  
  
  for(let i = 0; i < weekDays.length; i++){
    weekDays[i].classList.add('shrink')
  } 
}

ngOnInit() {
  this.getProjects()
}

}