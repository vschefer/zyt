
import { Injectable, Output, EventEmitter } from '@angular/core'
import {MatDialog} from '@angular/material';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable()
export class TodoAddService {
    headers: HttpHeaders;
    avatars: Object
    constructor(public dialog: MatDialog, private httpClient: HttpClient){} 

    auth(){
        this.headers =  new HttpHeaders({
            'Content-Type':  'application/json',
            'x-auth-token': JSON.parse(localStorage.getItem('currentUser')).token,
          })
    }
    addTodo(servers: any){
        let url = 'http://localhost:9000/api/todos'
        this.auth()
        return  this.httpClient.post(url, servers,{headers: this.headers});
    }

}
