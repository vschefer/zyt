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
  
  showDay(){
    let button = document.querySelector('.test')
    let weekDays = document.querySelectorAll('.all__ressource')
    let growDay = button.parentElement
    let myArray = Array.from(weekDays)
    //  weekDays.classList.add('shrink')
    growDay.classList.add('grow')
    
    
  }
  ngOnInit() {
    this.showDay()
  }
  
}
