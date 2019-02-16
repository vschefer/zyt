import { Component, OnInit, Input, HostBinding } from '@angular/core';
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
