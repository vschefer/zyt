import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {HttpClient} from '@angular/common/http'
import { Router } from '@angular/router';
import { ProjectService } from '../_services/project.service';
import { RessourceService } from '../_services/ressource.service';
import { element } from 'protractor';
import * as moment from 'moment';
@Component({
  selector: 'app-add-resouce',
  templateUrl: './add-resource.component.html',
  styleUrls: ['./add-resource.component.scss']
})
export class AddResourceComponent  implements OnInit {

  now = moment().format('YYYY-MM-DD');
  projects:Object
  specificProject: any
  selectedOption: any;
  selectedUser:any;
  objectKeys = Object.keys;
  ressource: Object
  time
  project
  proj
  activeProj
  startDate
  endDate
  constructor(private router: Router, 
    public snackBar: MatSnackBar, 
    private ressourceService: RessourceService,
    private projectsService: ProjectService) { }
  message = "Resource wurde hinzugefügt";
  action = "Ok";
  data
  users:Array<String>;
  
  openSnackBar() {
    this.snackBar.open(this.message, this.action, {
      duration: 2000,
    });
  }
  getProjects() {
    this.projectsService.getProjects().subscribe((response) => {
    this.data = response;
    console.log(this.data)
    console.log(this.now)
    let activeProj =[]
    this.data.forEach(element => {
      console.log(element.deadline)
      if(element.deadline >= this.now){
        activeProj.push(element)
      }
    });
    this.activeProj = activeProj
  },
  (error) => console.log(error)
)
}
getProject(id) {
  this.projectsService.getProject(id).subscribe((response) => {
  let users = [];
  
  let project = response;

  console.log(project)
  project['assigned_users'].forEach((user) => {
    users.push({
      "first_name": user.first_name,
      "surname": user.surname,
      "_id": user._id
    });
  });
  
  this.users = users;
  this.project = project
},
(error) => console.log(error)
)

}
getTime(e){
  this.time = e.target.value
}

onSave(){
  let nextButton = document.querySelector('.next')
  let prevButton = document.querySelector('.prev')
  let wrapper = document.querySelector('.wrapper')
  
  this.ressource={
    project: this.proj,
    assigned_user: this.selectedUser.toString(),
    total_time_expected: this.time,
    start: this.startDate,
    stop: this.endDate
    
  }
  
  this.ressourceService.addRessource(this.ressource).subscribe(
  (response)=> console.log(response),
)
this.openSnackBar();
this.router.navigate(['/']);
} 

ngOnInit() {
  this.getProjects();
  
}

}
