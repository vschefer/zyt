import { Component, OnInit } from '@angular/core';
import {WorkingWeekComponent} from '../../working-time/working-week/working-week.component'
import * as moment from 'moment';
import { RessourceService } from '../../../_services/ressource.service';
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
  dates: Object;
  dayNames = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag"];

  constructor(private ressourceService: RessourceService) {
    super()
    this.monday
    this.friday
    this.getWeek()
  }
  getWeek(){
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    let startOfWeek = moment().startOf('isoWeek');
    let endOfWeek = moment().endOf('isoWeek');
    let days = [];
    let day = startOfWeek;
    this.firstDay =new Date(this.monday) 
    this.firstDay = this.firstDay.getDate()
    this.lastDay =new Date(this.friday) 
    this.lastDay = this.lastDay.getDate()

    while (day <= endOfWeek) {
      days.push(day.toDate());
      day = day.clone().add(1, 'd');
    }

    this.monday = days[0].toLocaleDateString('de-DE', options)
    this.sunday = days[6].toLocaleDateString('de-DE', options)
    this.friday = days[4].toLocaleDateString('de-DE', options)
    this.week = days
    
  }
  getRessource(){
    this.ressourceService.getRessource().subscribe((response)=> {
      let weekRes = []
      this.ressource = response;
      this.ressource.forEach(element => { 
        
        if(moment(element.start).isBetween(this.week[0].toISOString().slice(0, 10), this.week[6].toISOString().slice(0, 10)) 
        ||element.stop >= this.week[6].toISOString().slice(0, 10) || element.stop <= this.week[6].toISOString().slice(0, 10)){
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
      this.weekRes = weekRes;
      this.toDay();
    },
    (error) => console.log(error))
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
    let weekDays = document.querySelectorAll('.all__ressource');
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
    this.getRessource();
  }
  
}
