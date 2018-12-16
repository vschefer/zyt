import { Directive,Component, OnInit, Input, Output,ElementRef, EventEmitter, HostListener } from '@angular/core';
import {SideBarService} from '../todo-detail/todo-detail.service'
import {MatDialog} from '@angular/material';
import { TodoDetailComponent } from '../todo-detail/todo-detail.component';
import { ServerService } from '../../server.service';
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
  data: Object
  positions:Array<String>;
  constructor(private sideBarService: SideBarService, public dialog: MatDialog, private serverService: ServerService) {
    
  }
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
  console.log(id);
  this.serverService.getAll('http://localhost:9000/api/projects/' + id).subscribe((response) => {
    let positions = [];

    let project = response.json();

    project.positions.forEach((position) => {
      positions.push({
        "todo": position.todos,
      });
    });

    this.positions = positions;
    console.log(this.positions);
    },
    (error) => console.log(error)
  )

}
  openDialog(): void {
      const dialogRef = this.dialog.open(TodoDetailComponent, {
     
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
  
      });
    }
  showDay(event){

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