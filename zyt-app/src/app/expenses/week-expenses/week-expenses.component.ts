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
  week
  constructor(private expensesService: ExpenseService) {}
  
  getExpenses(){
      let days = []
      let day = this.startOfWeek
      while (day <= this.endOfWeek) {
        days.push(day.toDate());
        day = day.clone().add(1, 'd');
      }
      this.week = days;
      console.log(this.week)
    this.expensesService.getExpenses().subscribe(
      (response)=> {
        this.expenses = response;
        let weekExpenses = [];
        this.expenses.forEach(element => {
          
          let affected_date = element.affected_date
          let  expenseDate = moment(affected_date).format('YYYY-MM-DD');
          
          if(moment(element.start).isBetween(this.week[0].toISOString().slice(0, 10), this.week[6].toISOString().slice(0, 10)) 
          ||element.stop >= this.week[6].toISOString().slice(0, 10) || element.stop <= this.week[6].toISOString().slice(0, 10)){
            let  startDate = moment(element.start);
            let    endDate = moment(element.stop);
          }
        });
  
        this.weekExpenses = weekExpenses;
      },
      (error) => console.log(error)
    )
  }
  
  ngOnInit() {
    this.getExpenses()
  }
  
}
