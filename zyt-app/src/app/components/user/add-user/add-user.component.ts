import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material';
import { UserService } from '../../../_services';
import { AvatarService } from '../../../_services/avatar.service';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  user: Object
  admin: Boolean
  archived: Boolean
  first_name: string
  surname: string
  email: string
  avatar: Object
  avatars: Object
  avatarId
  avatarUrl:string
  password
  
  
  constructor(
    private userService: UserService, 
    private avatarService: AvatarService, 
    public snackBar: MatSnackBar
  ) { }
  
  openSnackBar(message, action) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }
  
  chooseAvatar(avatarId){
    this.avatarId = avatarId
    
  }
  
  onSave(){
    let nextButton = document.querySelector('.next')
    let prevButton = document.querySelector('.prev')
    let wrapper = document.querySelector('.wrapper')
    
    this.user={
      admin: this.admin,
      archived: this.archived,
      first_name: this.first_name,
      surname: this.surname,
      email: this.email,
      avatar:this.avatarId,
      password: this.password,
    }
    this.userService.addUser(this.user).subscribe((response) => {
      this.openSnackBar(`${this.first_name} ${this.surname} wurde hinzugefügt.`, 'Ok');
    });
  }


getAvatars(){
  this.avatarService.getAvatars().subscribe(
  (response)=> {
    this.avatars = response;
  },
  (error) => console.log(error)
)

}
ngOnInit() {
  this.getAvatars()
}

}
