
import { Injectable, Output, EventEmitter } from '@angular/core'
import {MatDialog} from '@angular/material';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
        let url = 'http://localhost:9000/api/expenses/'
        this.auth()
        return  this.httpClient.post(url, servers,{headers: this.headers});
    }
}
