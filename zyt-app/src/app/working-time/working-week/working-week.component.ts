import { Component, OnInit } from '@angular/core';
import * as Charts from 'chart.js';
import { ServerService } from '../../server.service';
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
  
  loadExpenses() {
    this.toWork = 30;
    ServerService.getAllStatic('//localhost:9000/api/expenses/week').subscribe(
      (response)=> {
        const result = response;
        console.log(result)
        let totalWorkTime = 0;
        // result.then(res => {
        //   res.forEach(expense => {
        //     totalWorkTime += expense.recorded_time;
        //   });
        //   this.worked = totalWorkTime;
          
        //   if (this.toWork - this.worked <= 0) {
        //     this.toWork = 0;
        //   } else {
        //     this.toWork = this.toWork - this.worked;
        //   }
        //   this.chartData = [
        //     {
        //       data: [
        //         this.worked,
        //         this.toWork,
        //       ],
        //       backgroundColor: ['#000', '#ff0'],
        //     },
        //   ];
        // });
      },
      (error) => console.log(error) 
    )
  }
  colors = [
    {
      backgroundColor: [
        '#455C7B',
        '#FFBC67',
      ]
    }
  ]
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
  ngOnInit() {
    this.loadExpenses();
  }
  
}
