import { Component, OnInit } from '@angular/core';
import * as Charts from 'chart.js'
@Component({
  selector: 'app-working-month',
  templateUrl: './working-month.component.html',
  styleUrls: ['./working-month.component.scss']
})
export class WorkingMonthComponent implements OnInit {
  constructor() { }
  chartOptions = {
    responsive: true
  };

  chartData = [
    { data: [500, 600,], label: 'Account A' },
 
  ];

  onChartClick(event) {
    console.log(event);
  }
  ngOnInit() {
  }

}
