import { Component, OnInit } from '@angular/core';
import {WorkingWeekComponent} from '../working-time/working-week/working-week.component'
import { ServerService } from '../server.service';
import * as moment from 'moment';
@Component({
  selector: 'app-all-ressource',
  templateUrl: './all-resource.component.html',
  styleUrls: ['./all-resource.component.scss']
})
export class AllRessourceComponent extends WorkingWeekComponent implements OnInit {
  ressource
  now = moment().format('YYYY-MM-DD');
  mo
  fr
  firstDay
  lastDay
  startDay
  weekRes:Array<String>;
  dates: Object
  constructor(private serverService: ServerService) {
    super()
    this.monday
    this.friday
    this.getWeek()
  }
  getWeek(){
    let curr = new Date;
    let first = curr.getDate() - curr.getDay();
    first = first + 1
    let last = first + 6;
    let end = first + 4;
    this.firstDay = first
    let mon = new Date(curr.setDate(first))
    let sun = new Date(curr.setDate(last))
    let fri = new Date(curr.setDate(end))
    this.mo = mon
    this.lastDay = end
    this.fr = fri
    this.startDay = this.mo.toISOString().slice(0, 10)
    
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    this.monday = mon.toLocaleDateString('de-DE', options)
    this.sunday =sun.toLocaleDateString('de-DE', options)
    this.friday =fri.toLocaleDateString('de-DE', options)
  }
  getRessource(){
    this.serverService.getAll('http://localhost:9000/api/ressources').subscribe(
    (response)=> {
      let weekRes = []
      this.ressource = response.json();
      this.ressource.forEach(element => { 
        
        if(moment(element.start).isBetween(this.mo.toISOString().slice(0, 10), this.fr.toISOString().slice(0, 10)) 
        ||element.stop >= this.fr.toISOString().slice(0, 10) || element.stop <= this.fr.toISOString().slice(0, 10)){
          let  startDate = moment(element.start);
          let    endDate = moment(element.stop);
          let s = []
          let now = startDate, dates = [];
          
          while (now.isBefore(endDate) || now.isSame(endDate)) {
            dates.push(now.format('YYYY-MM-DD'));
            now.add(1, 'days');
          }
          
          dates.forEach((e)=>{
            s.push(new Date(e).getDate()) 
          })
          
          element.days = s
          weekRes.push(element)
          
        }
      });
      this.weekRes = weekRes
    },
    (error) => console.log(error)
  )
}

showDay(event){
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
