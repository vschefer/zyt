import { Component, OnInit } from '@angular/core';
import {WorkingWeekComponent} from '../working-time/working-week/working-week.component'
import { ServerService } from '../server.service';
@Component({
  selector: 'app-all-ressource',
  templateUrl: './all-resource.component.html',
  styleUrls: ['./all-resource.component.scss']
})
export class AllRessourceComponent extends WorkingWeekComponent implements OnInit {
  ressource: Object
  constructor(private serverService: ServerService) {
    super()
    this.monday
    this.friday
    this.getWeek()

    
  }
  getRessource(){
    this.serverService.getAll('http://localhost:9000/api/ressources').subscribe(
    (response)=> {
      this.ressource = response.json();
      console.log(this.ressource)
    },
    (error) => console.log(error)
  )
}
  showDay(event){
    console.log(this)
    let button = event.path[0]


    let weekDays = document.querySelectorAll('.all__ressource')
    let growDay = event.path[1]
    let myArray = Array.from(weekDays)
    for(let i = 0; i < weekDays.length; i++){
      weekDays[i].classList.remove('grow')
    }
    if(growDay.classList.contains('grow')){
      growDay.classList.remove('grow')
    }else{
      growDay.classList.add('grow')
    }


      for(let i = 0; i < weekDays.length; i++){
        weekDays[i].classList.add('shrink')
      } 
  }

  toDay(){
    let date = new Date()
    let today = date.getDay()
    let weekDays = document.querySelectorAll('.all__ressource')
    for(let i = 0; i < weekDays.length; i++){
      if(today != 0 && today != 6){
        if((today -1) == i){
          weekDays[i].classList.add('grow')
        }else{
          weekDays[i].classList.add('shrink')
        }
      }else if(i == 0){
        weekDays[i].classList.add('grow')
      }else{
        weekDays[i].classList.add('shrink')
      }
   
    }
  }
     
  ngOnInit() {
    // this.showDay()
    this.toDay()
    this.getRessource()
    
  }
  
}
