import { Component, OnInit } from '@angular/core';
import * as Charts from 'chart.js'
@Component({
  selector: 'app-working-week',
  templateUrl: './working-week.component.html',
  styleUrls: ['./working-week.component.scss']
})
export class WorkingWeekComponent implements OnInit {
  monday : string;
  sunday : string;
  friday : string;
  constructor() {
    this.getWeek()
    
  }
  chartOptions = {
    responsive: true
  };
  
  chartData = [
    { data: [10.5, 30,]},
    
  ];
  
  chartLabels = ['+', '-',];
  
  onChartClick(event) {
    console.log(event);
  }
  
  getWeek(){
    let curr = new Date;
    let first = curr.getDate() - curr.getDay();
    first = first + 1
    let last = first + 6;
    let end = first + 4;
    
    let mon = new Date(curr.setDate(first))
    let sun = new Date(curr.setDate(last))
    let fri = new Date(curr.setDate(end))
    
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    this.monday = mon.toLocaleDateString('de-DE', options)
    this.sunday =sun.toLocaleDateString('de-DE', options)
    this.friday =fri.toLocaleDateString('de-DE', options)
  }
  ngOnInit() {
  }
  
}
