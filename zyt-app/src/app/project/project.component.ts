import { Component, OnInit } from '@angular/core';
import { UpdateProjectService } from './project-overview/project-overview.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
  providers: [UpdateProjectService]
})
export class ProjectComponent implements OnInit {

  constructor() { }
  

  ngOnInit() {
  }

}
