import { Component, OnInit } from '@angular/core';
import { ServerService } from '../../../server.service'
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-time-form',
  templateUrl: './time-form.component.html',
  styleUrls: ['./time-form.component.scss']
})
export class TimeFormComponent implements OnInit {
  activity:string
  hour:number
  selecedJob
  projects
  date
  time: number
  expense: Object
  // activity: string
  constructor( private serverService: ServerService, public snackBar: MatSnackBar) { 
    this.getProject()
  }
  
  ngOnInit() {
  }
  
  getProject(){
    this.serverService.getAll('http://localhost:9000/api/projects').subscribe(
    (response)=> {
      this.projects = response.json();
      console.log(this.projects)
    },
    (error) => console.log(error)
  ) 
}

message = this.time + 'wurde für das Project ' + this.selecedJob + ' hinzugefügt';
action = 'Ok';
openSnackBar() {
  this.snackBar.open(this.message, this.action, {
    duration: 5000,
  });
}



postExpense(){
  this.expense={
    user: '5c0b00a46ed46412859f29a5',
    recorded_time: this.time,
    comment: this.activity,
    affected_date: this.date
  }
  
  this.serverService.add(this.expense, 'http://localhost:9000/api/expenses').subscribe(
  (response)=> console.log(response),
)
  this.openSnackBar()

}

}
