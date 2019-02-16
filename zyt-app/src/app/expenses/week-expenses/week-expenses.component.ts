import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { ExpenseService } from '../../_services/expenses.service';
@Component({
  selector: 'app-week-expenses',
  templateUrl: './week-expenses.component.html',
  styleUrls: ['./week-expenses.component.scss']
})
export class WeekExpensesComponent implements OnInit {
  now = moment().format('YYYY-MM-DD');
  expenses
  startOfWeek = moment().startOf('isoWeek');
  endOfWeek = moment().endOf('isoWeek');
  weekExpenses:Array<String>;
  total = 0;
  week
  constructor(private expensesService: ExpenseService) {}
  
  getExpenses(){
    console.log(this.startOfWeek)
      let days = []
      let day = this.startOfWeek
      while (day <= this.endOfWeek) {
        days.push(day.toDate());
        day = day.clone().add(1, 'd');
      }
      this.week = days;
      console.log(this.week)
    this.expensesService.getExpensesFromWeek(0).subscribe(
      (response)=> {
        this.expenses = response;
        console.log(this.expenses)

        this.expenses.forEach(element => {
          this.total += element.recorded_time
        });
      },
      (error) => console.log(error)
    )
  }
  
  ngOnInit() {
    this.getExpenses()
  }
  
}
