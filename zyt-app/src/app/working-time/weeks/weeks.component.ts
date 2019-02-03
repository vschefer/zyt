import { Component, OnInit } from '@angular/core';
import * as Charts from 'chart.js';
import { ServerService } from '../../server.service';
import * as moment from 'moment';

@Component({
  selector: 'app-weeks',
  templateUrl: './weeks.component.html',
  styleUrls: ['./weeks.component.scss']
})
export class WeeksComponent implements OnInit {
  minWorktime: number = 40;
  chartData0: any;
  chartData1: any;
  chartData2: any;
  chartData3: any;
  chartLabels: any;
  chartOptions: any;
  data: any = {};
  weekDetails: Object;

  constructor(
    private serverService: ServerService
  ) { }

  loadExpenses(): void {
    this.chartLabels = [
      'erfasst',
      'offen',
    ];

    this.chartOptions = {
      responsive: true
    };

    let chartAllData;
    for (let i = 0; i >= -3; i--) {
      this.serverService.getAll('//localhost:9000/api/expenses/week/' + i).subscribe((response: Array<Object>) => {
        let total = 0;
        response.forEach(exp => {
          total += exp['recorded_time'];
        });
        
        total = total === 0 ? 0 : total;
        const left = this.minWorktime - total <= 0 ? 0 : this.minWorktime - total;
        const data = [{data: [ total, left], backgroundColor: ['#000', '#ff0']}];
      
        if (i === 0) this.chartData0 = data;
        if (i === -1) this.chartData1 = data;
        if (i === -2) this.chartData2 = data;
        if (i === -3) this.chartData3 = data;
      });
    }
  }
  
  getWeekDetails() {
    const weekDetails = {};
    
    // weeks
    for (let i = 0; i >= -3; i--) {
      weekDetails[String(i)] = {
        week: moment().isoWeek() + i,
        weekStart: moment().startOf('isoWeek').isoWeek(moment().isoWeek() + i),
        weekEnd: moment().endOf('isoWeek').isoWeek(moment().isoWeek() + i)
      };
    };

    // console.log(0, weekDetails['0'].week);
    // console.log(1, weekDetails['0'].weekStart);
    // console.log(2, weekDetails['0'].weekEnd);

    this.weekDetails = weekDetails;
  }
  ngOnInit() {
    this.loadExpenses();
    this.getWeekDetails();
  }
}
