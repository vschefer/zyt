import { Component, OnInit } from '@angular/core';
import * as Charts from 'chart.js';
import { ExpenseService } from '../../../_services/expenses.service';
import * as moment from 'moment';

@Component({
  selector: 'app-weeks',
  templateUrl: './weeks.component.html',
  styleUrls: ['./weeks.component.scss']
})
export class WeeksComponent implements OnInit {
  minWorktime: number = 40;
  data: any = {};
  weekDetails: Object;
  chartData: Object;
  chartLabels: Array<String> = [
    'erfasst',
    'offen',
  ];
  chartOptions: Object = {
    responsive: true,
  };
  chartColors: Array<Object> = [
    {
      backgroundColor: [
        '#455C7B',
        '#FFBC67',
      ],
    },
  ];

  constructor(
    private expensesService: ExpenseService,
  ) { }

  loadExpenses(): void {
    let chartData = {};
    for (let i = 0; i >= -3; i--) {
      this.expensesService.getExpensesFromWeek(i).subscribe((response: Array<Object>) => {
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
        weekStart: moment().startOf('isoWeek').isoWeek(moment().isoWeek() + i).format('D.MM.YYYY'),
        weekEnd: moment().endOf('isoWeek').isoWeek(moment().isoWeek() + i).format('D.MM.YYYY')
      };
    };

    this.weekDetails = weekDetails;
  }
  ngOnInit() {
    this.loadExpenses();
    this.getWeekDetails();
  }
}
