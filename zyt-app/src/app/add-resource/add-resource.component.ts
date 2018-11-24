import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material';
@Component({
  selector: 'app-add-resouce',
  templateUrl: './add-resource.component.html',
  styleUrls: ['./add-resource.component.scss']
})
export class AddResourceComponent implements OnInit {

  constructor(public snackBar: MatSnackBar) { }
message = "Resource wurde hinzugefügt";
action = "Ok";
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
  ngOnInit() {
  }

}
