
import { Injectable, Output, EventEmitter } from '@angular/core'
import {MatDialog} from '@angular/material';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable()
export class TodoDetailService {
    headers: HttpHeaders;
    avatars: Object
    constructor(public dialog: MatDialog, private httpClient: HttpClient){}
    
    auth(){
        this.headers =  new HttpHeaders({
            'Content-Type':  'application/json',
            'x-auth-token': JSON.parse(localStorage.getItem('currentUser')).token,
          })
    }
    getTodo(id){
        let url = 'http://localhost:9000/api/todos/';
        this.headers = new HttpHeaders();
        this.auth()
        return  this.httpClient.get(url + id,{headers: this.headers});
    } 

    updateTodo(data:object, id:any) {
      let url = 'http://localhost:9000/api/todos/'
      this.auth();
      return  this.httpClient.put(url + id, data, {headers: this.headers});
  }

}
