import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  public avatars = [{
    name: 'Hase',
    id: 1,
    url: '../../../assets/images/avatar/rabbit-avatar.jpg',
    choose: false
  },{
    name: 'Bär',
    id: 2,
    url: '../../../assets/images/avatar/baer-avatar.jpg',
    choose: false
  },{
    name: 'Biber',
    id: 3,
    url:'../../../assets/images/avatar/biber-avatar.jpg',
    choose: false
  },{
    name: 'Eule',
    id: 4,
    url: '../../../assets/images/avatar/eule-avatar.jpg',
    choose: true
  }, {
    name: 'Fuchs',
    id: 5,
    url: '../../../assets/images/avatar/fuchs-avatar.jpg',
    choose: false,
  },{
    name: 'Koala',
    id: 6,
    url: '../../../assets/images/avatar/koala-avatar.jpg',
    choose: false,
  },{
    name: 'Luchs',
    id: 7,
    url: '../../../assets/images/avatar/luchs-avatar.jpg',
    choose: false
  },{
    name: 'Wolf',
    id: 8,
    url:'../../../assets/images/avatar/wolf-avatar.jpg',
    choose: false
  }]
  constructor() {
    console.log(this.avatars[0].url)
   }

  ngOnInit() {
  }

}
