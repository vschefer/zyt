import { Component, OnInit } from '@angular/core';
import * as Charts from 'chart.js'
@Component({
  selector: 'app-working-time',
  templateUrl: './working-time.component.html',
  styleUrls: ['./working-time.component.css']
})
export class WorkingTimeComponent implements OnInit {

  constructor() { }
  chartOptions = {
    responsive: true
  };

  chartData = [
    { data: [330, 600,], label: 'Account A' },
 
  ];

  // chartLabels = ['January', 'February', 'Mars', 'April'];

  onChartClick(event) {
    console.log(event);
  }
  ngOnInit() {
  }

}
