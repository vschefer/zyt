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


  constructor(public snackBar: MatSnackBar, private serverService: ServerService) { }
message = "Resource wurde hinzugefügt";
action = "Ok";
data:Object;
users:Array<String>;
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
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
  bleh(id) {
    console.log(id);
    this.serverService.getAll('http://localhost:9000/api/projects/' + id).subscribe((response) => {
      let users = [];

      let project = response.json();

      project.assigned_users.forEach((user) => {
        users.push(user.first_name);
      });

      this.users = users;
      console.log(this.users);
      },
      (error) => console.log(error)
    )

  }

  ngOnInit() {
    this.getProjects();

  }

}
