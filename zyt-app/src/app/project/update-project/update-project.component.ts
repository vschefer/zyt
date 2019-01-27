import { Component, OnInit, Input, HostBinding, Inject } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {MatDialog} from '@angular/material';
import { UpdateButtonComponent } from '../project-overview/update-button/update-button.component';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { User } from '../../_models';
import { ProjectUpdateService } from './update-project.service';
import { ProjectOverviewService } from '../project-overview/project-overview.service';
import { UsersService } from '../../user/user.service';
@Component({
  selector: 'app-update-project',
  templateUrl: './update-project.component.html',
  styleUrls: ['./update-project.component.scss']
})

export class UpdateProjectComponent extends UpdateButtonComponent implements OnInit {
  public id: Object
  project: any
  users
  name: String
  title: String
  description: String
  updatedProject: Object
  briefingTitle: string
  briefingDescription: string
  toAssigned:any
  assignedUser:Array<String>;
  constructor(private usersService: UsersService, private projectUpdateService: ProjectUpdateService, public dialog: MatDialog,@Inject(MAT_DIALOG_DATA) private data: { id: Object }, private mdDialogRef: MatDialogRef<UpdateProjectComponent>) {
    super(dialog)
    
  }
  getProject() {
    
    console.log(this.id)
    this.projectUpdateService.getProject(this.id).subscribe((response) => {
    let project = response;
    this.project = project
    let  toAssigned = []
    project['assigned_users'].forEach(u => {
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
  this.usersService.getUsers().subscribe(
  (response)=> {
    this.users = response;
  },
  (error) => console.log(error)
)
}
updateProject(){
  console.log(0, this.toAssigned);
  
  this.updatedProject = {
    name: this.name || this.project.name,
    briefing: {
      description: this.description || this.project.briefing.description
    },
    assigned_users: this.toAssigned || this.project.assigned_users.map(usr => usr._id)
  }
  
  this.projectUpdateService.updateProject(this.updatedProject, this.id).subscribe()
}

toArray(answers: object) {
  return Object.keys(answers).map(key => answers[key])
}

ngOnInit() {
  this.id = this.data.id;
  this.getProject()
  this.getUsers()
  
}



}
