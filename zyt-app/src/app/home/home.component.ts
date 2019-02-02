import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import {WorkingWeekComponent} from '../working-time/working-week/working-week.component';
import { RessourceService } from '../_services/ressource.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends WorkingWeekComponent implements OnInit {
  
  ressource
  now = moment().format('YYYY-MM-DD');
  mo
  fr
  firstDay
  lastDay
  startDay
  weekRes:Array<String>;
  dates: Object
  week
  monday
  friday
  constructor(private ressourceService : RessourceService) { 
    super()
    this.getWeek()
  }
  
  ngOnInit() {
    this.getWeek()
    this.getRessource()
  }
  getWeek(){
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    let startOfWeek = moment().startOf('isoWeek');
    let endOfWeek = moment().endOf('isoWeek');
    let days = [];
    let day = startOfWeek;
    
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
    this.ressourceService.getRessource().subscribe(
    (response)=> {
      let weekRes = []
      this.ressource = response;
      this.ressource.forEach(element => { 
        
        if(moment(element.start).isBetween(this.week[0].toISOString().slice(0, 10), this.week[6].toISOString().slice(0, 10)) 
        ||element.stop >= this.week[6].toISOString().slice(0, 10) || element.stop <= this.week[6].toISOString().slice(0, 10)){
          let startDate = moment(element.start);
          let endDate = moment(element.stop);
          let s = []
          let now = startDate, dates = [];
          
          while (now.isBefore(endDate) || now.isSame(endDate)) {
            dates.push(now.format('YYYY-MM-DD'));
            now.add(1, 'days');
          }
          
          dates.forEach((e)=>{
            let date = new Date(e)
            let momentDate = date.toISOString().slice(0, 10)
            s.push(momentDate) 
          })
          element.days = s
          
          
          element.days.forEach(e => {
            if(e == this.now){
              weekRes.push(element)
            }
          });
        }
      });
      this.weekRes = weekRes
    },
    (error) => console.log(error)
  )
}

}
