import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-working-week',
  templateUrl: './working-week.component.html',
  styleUrls: ['./working-week.component.scss']
})
export class WorkingWeekComponent implements OnInit {
  monday : string;
  sunday : string;
  friday : string;
  expenses: any;
  worked: number;
  chartData: any;
  toWork: number;
  week
  constructor() {
    this.getWeek()
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
  ngOnInit() {}
  
}
