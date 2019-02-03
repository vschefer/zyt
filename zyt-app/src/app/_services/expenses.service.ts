
import { Injectable, Output, EventEmitter } from '@angular/core'
import {MatDialog} from '@angular/material';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { backendUrls } from '../constant/backendurls';

@Injectable()
export class ExpenseService {
    id
    headers: HttpHeaders;
    avatars: Object
    constructor(private httpClient: HttpClient){}
    

    auth(){
        this.headers =  new HttpHeaders({
            'Content-Type':  'application/json',
            'x-auth-token': JSON.parse(localStorage.getItem('currentUser')).token,
          })
    }

    addExpense(servers){
        this.auth()
        return  this.httpClient.post(backendUrls.expenses, servers,{headers: this.headers});
    }
    getExpenses(){
        this.auth()
        return  this.httpClient.get(backendUrls.expenses,{headers: this.headers});
    }
    getExpensesFromWeek(week) {
        this.auth();
        return this.httpClient.get(backendUrls.expensesWeek + week,{headers: this.headers});
    }
}
