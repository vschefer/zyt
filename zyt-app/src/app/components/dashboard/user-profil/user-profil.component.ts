import { Component, OnInit } from '@angular/core';
import { UserEditComponent } from '../user-edit/user-edit.component';
import {MatDialog} from '@angular/material';
import { AuthenticationService, UserService } from '../../../_services';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-profil',
  templateUrl: './user-profil.component.html',
  styleUrls: ['./user-profil.component.scss']
})
export class UserProfilComponent implements OnInit {
  constructor(public dialog: MatDialog, private userService: UserService,
    private router: Router, private authenticationService: AuthenticationService) { }
  me:any;
  avatar:string;
  first_name:string;
  surname:string;
  interval: any;
  openDialog(): void {
    let inter: any;
    const dialogRef = this.dialog.open(UserEditComponent, {
      
    });
    inter = setInterval(() => {
      this.userService.getMe().subscribe((response) => {
      this.me = response;
      this.avatar = this.me.avatar.url;
    },
    (error) => console.log(error)
  );
}, 1000);

dialogRef.afterClosed().subscribe(result => {
  console.log('The dialog was closed');
  clearInterval(inter);
});
}

getAvatar() {
  this.userService.getMe().subscribe((response) => {
  this.me = response;
  this.avatar = this.me.avatar.url;
},
(error) => console.log(error)
)
}

getUserName() {
  this.userService.getMe().subscribe((response) => {
  this.me = response;
  this.first_name = this.me.first_name;
  this.surname = this.me.surname;
},
(error) => console.log(error))
}

logout() {
  this.authenticationService.logout();
  this.router.navigate(['/login']);
}

ngOnInit() {
  this.getAvatar();
  this.getUserName()
}

}
