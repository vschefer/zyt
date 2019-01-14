import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {HttpClient} from '@angular/common/http'
import { ServerService } from '../server.service';
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
  constructor(public snackBar: MatSnackBar, private serverService: ServerService) { }
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
    this.serverService.getAll('http://localhost:9000/api/projects').subscribe((response) => {
    this.data = response.json();
  },
  (error) => console.log(error)
)
}
getProject(id) {
  this.serverService.getAll('http://localhost:9000/api/projects/' + id).subscribe((response) => {
  let users = [];
  
  let project = response.json();
  
  project.assigned_users.forEach((user) => {
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
  
  this.serverService.add(this.ressource, 'http://localhost:9000/api/ressources').subscribe(
  (response)=> console.log(response),
)
this.openSnackBar()
} 

ngOnInit() {
  this.getProjects();
  
}

}
