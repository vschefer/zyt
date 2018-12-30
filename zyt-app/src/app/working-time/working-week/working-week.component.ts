import { Component, OnInit } from '@angular/core';
import * as Charts from 'chart.js';
import { ServerService } from '../../server.service';

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
  worked: Number;
  chartData: any;
  constructor() {
    this.getWeek()
  }
  
  loadExpenses() {
    ServerService.getAllStatic('//localhost:9000/api/expenses/week').subscribe(
      (response)=> {
        const result = response.json();
        let totalWorkTime = 0;
        result.then(res => {
          console.log(1, res);
          res.forEach(expense => {
            totalWorkTime += expense.recorded_time;
          });
          this.worked = totalWorkTime;
          this.chartData = [
            {
              data: [
                this.worked,
                30,
              ],
            },
          ];
          console.log(this.chartData);
        });
      },
      (error) => console.log(error) 
    )
  }
  chartOptions = {
    responsive: true
  };
  
  chartLabels = [
    'worked',
    'left',
  ];
  
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
    this.loadExpenses();
  }
  
}
