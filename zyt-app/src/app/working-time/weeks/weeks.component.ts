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
  chartData: Object;
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

    let chartData = {};
    for (let i = 0; i >= -3; i--) {
      this.serverService.getAll('//localhost:9000/api/expenses/week/' + i).subscribe((response: Array<Object>) => {
        let total = 0;
        response.forEach(exp => {
          total += exp['recorded_time'];
        });
        
        total = total === 0 ? 0 : total;
        const left = this.minWorktime - total <= 0 ? 0 : this.minWorktime - total;
        const data = [{data: [ total, left], backgroundColor: ['#000', '#ff0']}];
      
        chartData[String(i)] = data;
        this.chartData = chartData;
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

    this.weekDetails = weekDetails;
  }
  ngOnInit() {
    this.loadExpenses();
    this.getWeekDetails();
  }
}
