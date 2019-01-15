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
  selectedPositionName
  selectedJob
  message
  action
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


openSnackBar() {
  this.snackBar.open(this.message, this.action, {
    duration: 5000,
  });
}
getThisProject(id) {
  this.serverService.getAll('http://localhost:9000/api/projects/' + id).subscribe((response) => {
  
  this.specificProject = response.json();
  this.selectedJob = this.specificProject.name;
},
(error) => console.log(error)
)

}
toArray(answers: object) {
  return Object.keys(answers).map(key => answers[key])
}

getPositionName(id) {
  this.selectedPositionName = this.specificProject.positions.filter((pos) => {
  	return pos._id === id;
  })[0].name;
  debugger;
}

onTimeChange(val) {
  this.time = val;
}

postExpense(){
  console.log(this.selectedPosition);
  const month = this.date.getUTCMonth() + 1; //months from 1-12
  const day = this.date.getUTCDate() + 2;
  const year = this.date.getUTCFullYear();
  
  this.expense={
    recorded_time: this.time,
    comment: this.activity,
    affected_date: `${year}-${month}-${day}`,
    project: this.specificProject._id,
    position: this.selectedPosition
  }
  debugger;
  console.log(this.expense)
  this.serverService.add(this.expense, 'http://localhost:9000/api/expenses').subscribe(
  (response)=> console.log(response),
)
this.message = this.time + 'h wurde für das Project ' + this.specificProject.name + ' hinzugefügt';
this.action = 'Ok';
  this.openSnackBar()

}

}
