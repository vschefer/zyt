import { Component, OnInit } from '@angular/core';
import {MatSnackBar, MatInputModule, MatSelectModule} from '@angular/material';
import { UserService } from '../../_services';
import { AvatarService } from '../../_services/avatar.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  
  constructor(private userService: UserService, 
    private avatarService: AvatarService,
    public snackBar: MatSnackBar) {}
    
    avatars:any;
    password
    passwordRepeat
    message = "Dein Passwort wurde geändert";
    action = "OK"
    userId;
    
    getMe() {
      this.userService.getMe().subscribe((response) => {
        let data = response;
        this.userId = data['_id']
      },
      (error) => console.log(error))
    }
    
    getAvatars() {
      this.avatarService.getAvatars().subscribe((response) => {
        this.avatars = response;
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
    this.userService.updateMe({avatar: avatarID}, this.userId).subscribe()
  }
  
  changePassword(){
    const userID = JSON.parse(localStorage.getItem('currentUser'))._id;
    if(this.password != undefined && this.passwordRepeat != undefined ){
      if(this.password == this.passwordRepeat) {
        this.userService.updateMe({password: this.password}, this.userId).subscribe((response) => {
        },
        (error) => console.log(error))
        this.openSnackBar()
      }
    }
    
  }
  
  ngOnInit() {
    this.getMe()
    this.getAvatars();
  }
}
