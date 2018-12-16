import { Component, OnInit } from '@angular/core';
import { ServerService } from '../../server.service';
@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  constructor(private serverService: ServerService) {}

  avatars:Array<Object>;

  getAvatars() {
    this.serverService.getAll('//localhost:9000/api/avatars').subscribe((response) => {
      this.avatars = response.json();
      console.log(this.avatars);
      },
      (error) => console.log(error)
    )
  }

  changeAvatar(avatarID) {
    const userID = JSON.parse(localStorage.getItem('currentUser'))._id;
    this.serverService.put('//localhost:9000/api/users/' + userID, {avatar: avatarID}).subscribe((response) => {
      console.log(response);
      },
      (error) => console.log(error)
    )
  }

  ngOnInit() {
    this.getAvatars();
  }

}
