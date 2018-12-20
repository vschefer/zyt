import { Component, OnInit, Input, HostBinding, Inject } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { ServerService } from '../../server.service';
import {MatDialog} from '@angular/material';
import { UpdateButtonComponent } from '../project-overview/update-button/update-button.component';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { User } from '../../_models';
@Component({
  selector: 'app-update-project',
  templateUrl: './update-project.component.html',
  styleUrls: ['./update-project.component.scss']
})

export class UpdateProjectComponent extends UpdateButtonComponent implements OnInit {
  public id: Object
  project: Object
  users
  updatedProject: Object
  briefingTitle: string
  briefingDescription: string
  toAssigned:Array<String>;
  assignedUser:Array<String>;
  constructor(private serverService: ServerService, public dialog: MatDialog,@Inject(MAT_DIALOG_DATA) private data: { id: Object }, private mdDialogRef: MatDialogRef<UpdateProjectComponent>) {
    super(dialog)
    
  }
  getProject() {
    
    console.log(this.id)
    this.serverService.getAll('http://localhost:9000/api/projects/' + this.id).subscribe((response) => {
    let project = response.json();
    console.log(this.project)
    this.project = project
    let  toAssigned = []
    project.assigned_users.forEach(u => {
      let id = u._id
      toAssigned.push(id)
    });
    this.toAssigned = toAssigned
    
  },
  (error) => console.log(error)
)


}

assigned(id){
  let assignedUser = []
  console.log(id)
  this.users.forEach(element => {
    
    for(let i = 0; i < id.length; i++){
      if(id[i] == element._id){
        assignedUser.push(element)
      }
    }
  });
  
  this.assignedUser = assignedUser
  console.log(this.assignedUser)
}
getUsers(){
  this.serverService.getAll('http://localhost:9000/api/users').subscribe(
  (response)=> {
    this.users = response.json();
  },
  (error) => console.log(error)
)
}
updateProject(){
  console.log(this.toAssigned)
  this.updatedProject={
    
    briefing:{
      title: this.briefingTitle,
      description: this.briefingDescription
    },
    assigned_users: this.assignedUser
  }
  this.serverService.add(this.updatedProject, 'http://localhost:9000/api/projects' + this.id).subscribe(
  (response)=> console.log(response),
)
}

toArray(answers: object) {
  return Object.keys(answers).map(key => answers[key])
}

ngOnInit() {
  console.log("init")
  
  this.id = this.data.id;
  console.log(this.id)
  this.getProject()
  this.getUsers()
  
}



}