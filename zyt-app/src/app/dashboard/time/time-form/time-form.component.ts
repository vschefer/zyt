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
  specificProject
  selectedPosition
  selectedJob
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
getThisProject(id) {
  console.log(id);
  this.serverService.getAll('http://localhost:9000/api/projects/' + id).subscribe((response) => {
  
  this.specificProject = response.json();
console.log(this.specificProject)
},
(error) => console.log(error)
)

}
toArray(answers: object) {
  return Object.keys(answers).map(key => answers[key])
}


postExpense(){
  console.log(this.selectedPosition)
  this.expense={
    recorded_time: this.time,
    comment: this.activity,
    affected_date: this.date,
    project: this.selectedJob,
    position: this.selectedPosition
  }
  console.log(this.expense)
  this.serverService.add(this.expense, 'http://localhost:9000/api/expenses').subscribe(
  (response)=> console.log(response),
)
  this.openSnackBar()

}

}
