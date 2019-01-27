import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {HttpClient} from '@angular/common/http'
import { Router } from '@angular/router';
import { ProjectOverviewService } from '../project/project-overview/project-overview.service';
import { ProjectUpdateService } from '../project/update-project/update-project.service';
import { RessouceAddService } from './add-ressource.service';
@Component({
  selector: 'app-add-resouce',
  templateUrl: './add-resource.component.html',
  styleUrls: ['./add-resource.component.scss']
})
export class AddResourceComponent  implements OnInit {
  projects:Object
  specificProject: any
  selectedOption: any;
  selectedUser:any;
  objectKeys = Object.keys;
  ressource: Object
  time
  project
  proj
  startDate
  endDate
  constructor(private router: Router, public snackBar: MatSnackBar, private ressourceAddServer: RessouceAddService,
    private projectsService: ProjectOverviewService, private projectService: ProjectUpdateService) { }
  message = "Resource wurde hinzugefügt";
  action = "Ok";
  data:Object;
  users:Array<String>;
  
  openSnackBar() {
    this.snackBar.open(this.message, this.action, {
      duration: 2000,
    });
  }
  getProjects() {
    this.projectsService.getProjects().subscribe((response) => {
    this.data = response;
  },
  (error) => console.log(error)
)
}
getProject(id) {
  this.projectService.getProject(id).subscribe((response) => {
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
  
  this.ressourceAddServer.addRessource(this.ressource).subscribe(
  (response)=> console.log(response),
)
this.openSnackBar();
this.router.navigate(['/']);
} 

ngOnInit() {
  this.getProjects();
  
}

}
