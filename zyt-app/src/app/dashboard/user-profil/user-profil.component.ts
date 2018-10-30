import { Component, OnInit } from '@angular/core';
import { UserEditComponent } from '../user-edit/user-edit.component';
import {MatDialog} from '@angular/material';
@Component({
  selector: 'app-user-profil',
  templateUrl: './user-profil.component.html',
  styleUrls: ['./user-profil.component.scss']
})
export class UserProfilComponent implements OnInit {

  constructor(public dialog: MatDialog) { }
  openDialog(): void {
      const dialogRef = this.dialog.open(UserEditComponent, {
     
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
  
      });
    }

  ngOnInit() {
  }

}