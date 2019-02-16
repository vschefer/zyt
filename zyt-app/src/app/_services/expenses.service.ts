import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http';
import { backendUrls } from '../constant/backendurls';
import { LocalStorageService } from './localStorage.service';

@Injectable()
export class ExpenseService extends LocalStorageService {
  id: string;
  
  constructor( private httpClient: HttpClient ) {
    super();
  }

  addExpense(servers) {
    return this.httpClient.post(backendUrls.expenses, servers, { headers: this.headers } );
  }
  
  getExpenses() {
    return this.httpClient.get(backendUrls.expenses, { headers: this.headers } );
  }
  
  getExpense(id) {
    return this.httpClient.get(backendUrls.expenses + id, { headers: this.headers } );
  }
  
  getExpensesFromWeek(week) {
    return this.httpClient.get(backendUrls.expensesWeek + week, { headers: this.headers } );
  }
  
  updateExpense(data:object, id:any) {
    return this.httpClient.put(backendUrls.expenses + id, data, { headers: this.headers } );
  }
}
