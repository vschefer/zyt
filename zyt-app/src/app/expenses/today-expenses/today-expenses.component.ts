import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { ExpensesService } from './today-expenses.service';
@Component({
  selector: 'app-today-expenses',
  templateUrl: './today-expenses.component.html',
  styleUrls: ['./today-expenses.component.scss']
})
export class TodayExpensesComponent implements OnInit {
  now = moment().format('YYYY-MM-DD');
  expenses
  todayExpenses:Array<String>;
  constructor(private expensesService: ExpensesService) {}
    
  getExpenses(){
    // let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    this.expensesService.getExpenses().subscribe(
    (response)=> {
      this.expenses = response;
      let todayExpenses = [];
this.expenses.forEach(element => {

  let affected_date = element.affected_date
  let  expenseDate = moment(affected_date).format('YYYY-MM-DD');


  if(this.now === expenseDate){
    todayExpenses.push(element)
  }
});
   this.todayExpenses = todayExpenses;
   console.log(this.todayExpenses)
    },
    (error) => console.log(error)
  )
}
  
  ngOnInit() {
    this.getExpenses()
  }
  
}
