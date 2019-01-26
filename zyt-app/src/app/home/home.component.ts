import { Component, OnInit } from '@angular/core';
import { ServerService } from '../server.service';
import * as moment from 'moment';
import {WorkingWeekComponent} from '../working-time/working-week/working-week.component'
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
  constructor(private serverService: ServerService) { 
    super()
    this.monday
    this.friday
    this.getWeek()
  }
  
  ngOnInit() {
    this.getWeek()
    this.getRessource()
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
      this.ressource = response;
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
