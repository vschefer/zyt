import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { MatDialogRef, MAT_DIALOG_DATA, MatInputModule } from "@angular/material";
import { MatCheckboxModule } from '@angular/material/checkbox';
// import { UsersUpdateService } from './update-user.service';
import { UserService } from '../../_services';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {
  public id: Object;
  user: Object;
  updatedUser: Object;
  
  constructor(
    private userService: UserService,
    private matCheckboxModule: MatCheckboxModule,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) private data: { id: Object },
    private mdDialogRef: MatDialogRef<UpdateUserComponent>
  ) {}
  
  getUser() {
    this.userService.getUser(this.id).subscribe((response) => {
    let user = response;
    this.user = user;
  }, (error) => console.log(error)  );
}

onSubmit(f: NgForm) {
  this.updatedUser = Object.assign({}, f.form.controls);
  
  // Object cleanup for post
  Object.keys(this.updatedUser).forEach((key) => {
    this.updatedUser[key].value === undefined ? delete this.updatedUser[key] : this.updatedUser[key] = this.updatedUser[key].value;
  });
  
  this.userService.updateUser(this.updatedUser, this.id).subscribe((response)=> console.log(response));
  window.location.reload();
}

ngOnInit() {
  this.id = this.data.id;
  this.getUser();
}

}
