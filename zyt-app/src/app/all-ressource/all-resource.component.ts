import { Component, OnInit } from '@angular/core';
import {WorkingWeekComponent} from '../working-time/working-week/working-week.component'
@Component({
  selector: 'app-all-ressource',
  templateUrl: './all-resource.component.html',
  styleUrls: ['./all-resource.component.scss']
})
export class AllRessourceComponent extends WorkingWeekComponent implements OnInit {
 
  constructor() {
      super()
        this.monday
      this.friday
      this.getWeek()

   }

  ngOnInit() {
  }

}
