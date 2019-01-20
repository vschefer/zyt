import { Directive,Component, OnInit, Input, Output,ElementRef, EventEmitter, HostListener } from '@angular/core';
import {SideBarService} from '../todo-detail/todo-detail.service'
import {MatDialog} from '@angular/material';
import { TodoDetailComponent } from '../todo-detail/todo-detail.component';
import { ServerService } from '../../server.service';
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
  windowWidth = document.body.clientWidth;
  spalte = this.windowWidth
  data: Object
  positions:Array<String>;
  project: Object
  todos : Object
  public id
  public projId
  constructor(private sideBarService: SideBarService, public dialog: MatDialog, private serverService: ServerService) {
    
  }
  proj:Array<String>;
  todo:Array<String>;
  getProject(){
    this.serverService.getAll('http://localhost:9000/api/projects').subscribe(
    (response)=> {
      
      this.data = response.json();
    },
    (error) => console.log(error) 
  )
}
toArray(answers: object) {
  return Object.keys(answers).map(key => answers[key])
}

bleh(id) {
  this.serverService.getAll('http://localhost:9000/api/projects/' + id).subscribe((response) => {
  let proj = [];
  
  let project = response.json();
  project.todos.forEach((user) => {
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

tog(){
  this.sideBarService.toggle();
  let wrapper = document.querySelector('.wrapper') as HTMLElement;
  let body = document.querySelector('body')
  wrapper.classList.toggle('open')
  body.classList.toggle('open')
  if(document.querySelector('.open')){
    wrapper.style.overflowX = 'scroll';
  }else{
    document.body.style.width = '100vw'
    document.body.style.overflowX = 'hidden'
  }
}

ngOnInit() {
  this.getProject()
}

}