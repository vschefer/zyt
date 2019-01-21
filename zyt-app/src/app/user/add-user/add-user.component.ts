import { Component, OnInit } from '@angular/core';
import { ServerService } from '../../server.service';
import {MatSnackBar} from '@angular/material';
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
  
  
  constructor(private serverService: ServerService, public snackBar: MatSnackBar) { }
  
  message = this.first_name + this.surname + 'wurde hinzugefügt';
  action = 'Ok';
  openSnackBar() {
    this.snackBar.open(this.message, this.action, {
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
    this.serverService.add(this.user, 'http://localhost:9000/api/users').subscribe(
    (response)=> console.log(response),
  )
  this.openSnackBar()
} 

getAvatars(){
  this.serverService.getAll('http://localhost:9000/api/avatars').subscribe(
  (response)=> {
    this.avatars = response.json();
    console.log(this.avatars)
  },
  (error) => console.log(error)
)

}
ngOnInit() {
  this.getAvatars()
}

}
