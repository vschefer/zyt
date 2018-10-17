import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';
import { TimeFormComponent } from './time-form/time-form.component';
@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.scss']
})
export class TimeComponent implements OnInit {

  constructor(public dialog: MatDialog) { }
openDialog(): void {
    const dialogRef = this.dialog.open(TimeFormComponent, {
   
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }
  ngOnInit() {
  }

}