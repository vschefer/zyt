import { Component, OnInit } from '@angular/core';
import { UserEditComponent } from '../user-edit/user-edit.component';
import { ServerService } from '../../server.service';
import {MatDialog} from '@angular/material';
@Component({
  selector: 'app-user-profil',
  templateUrl: './user-profil.component.html',
  styleUrls: ['./user-profil.component.scss']
})
export class UserProfilComponent implements OnInit {
  constructor(public dialog: MatDialog, private serverService: ServerService) { }
  me:any;
  avatar:string;
  first_name:string;
  surname:string;
  openDialog(): void {
      const dialogRef = this.dialog.open(UserEditComponent, {

      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');

      });
    }

  getAvatar() {
    this.serverService.getAll('//localhost:9000/api/users/me').subscribe((response) => {
      this.me = response.json();
      this.avatar = this.me.avatar.url;
      },
      (error) => console.log(error)
    )
  }

  getUserName() {
    this.serverService.getAll('//localhost:9000/api/users/me').subscribe((response) => {
      this.me = response.json();
      this.first_name = this.me.first_name;
      this.surname = this.me.surname;
      },
      (error) => console.log(error)
    )
  }

  ngOnInit() {
    this.getAvatar();
    this.getUserName()
  }

}
