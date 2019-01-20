import { Component, OnInit } from '@angular/core';
import { ServerService } from '../../server.service';
import {MatSnackBar, MatInputModule, MatSelectModule} from '@angular/material';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  constructor(private serverService: ServerService, public snackBar: MatSnackBar) {
  }

  avatars:Array<Object>;
  password
  passwordRepeat
  message = "Dein Passwort wurde geändert";
  action = "OK"
  getAvatars() {
    this.serverService.getAll('//localhost:9000/api/avatars').subscribe((response) => {
      this.avatars = response.json();
      },
      (error) => console.log(error)
    )
  }
  openSnackBar() {
    this.snackBar.open(this.message, this.action, {
      duration: 5000,
    });
  }
  changeAvatar(avatarID) {
    const userID = JSON.parse(localStorage.getItem('currentUser'))._id;
    this.serverService.put('//localhost:9000/api/users/' + userID, {avatar: avatarID}).subscribe((response) => {
      console.log(response);
      },
      (error) => console.log(error)
    )
  }
  changePassword(){
    const userID = JSON.parse(localStorage.getItem('currentUser'))._id;
  if(this.password != undefined && this.passwordRepeat != undefined ){
    if(this.password == this.passwordRepeat) {
      this.serverService.put('//localhost:9000/api/users/' + userID, {password: this.password}).subscribe((response) => {
        console.log(response);
        },
        (error) => console.log(error)
      )
      this.openSnackBar()
    }
  }
 
  }

  ngOnInit() {
    this.getAvatars();
  }

}
