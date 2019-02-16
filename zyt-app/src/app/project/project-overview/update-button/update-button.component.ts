import { Component, OnInit, Input, HostBinding } from '@angular/core';
import {UpdateProjectComponent} from '../../update-project/update-project.component'
@Component({
  selector: 'app-update-button',
  templateUrl: './update-button.component.html',
  styleUrls: ['./update-button.component.scss'],
})

export class UpdateButtonComponent implements OnInit{
  public id
  @Input() parentData
  
  constructor() {}
  
  ngOnInit() {} 
}
