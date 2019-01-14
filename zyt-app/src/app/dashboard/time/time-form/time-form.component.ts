import { Component, OnInit } from '@angular/core';
import { ServerService } from '../../../server.service'
import {MatSnackBar, MatInputModule, MatSelectModule} from '@angular/material';

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
  constructor( private serverService: ServerService, public snackBar: MatSnackBar) { 
    this.getProject()
  }
  
  ngOnInit() {
  }
  
  getProject(){
    this.serverService.getAll('http://localhost:9000/api/projects').subscribe(
    (response)=> {
      this.projects = response.json();
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
  this.serverService.getAll('http://localhost:9000/api/projects/' + id).subscribe((response) => {
  
  this.specificProject = response.json();
},
(error) => console.log(error)
)

}
toArray(answers: object) {
  return Object.keys(answers).map(key => answers[key])
}


postExpense(){
  this.expense={
    recorded_time: this.time.toString(),
    comment: this.activity,
    affected_date: this.date,
    project: this.selectedJob,
    position: this.selectedPosition
  }
  this.serverService.add(this.expense, 'http://localhost:9000/api/expenses').subscribe(
  (response)=> console.log(response),
)
  this.openSnackBar()

}

}
