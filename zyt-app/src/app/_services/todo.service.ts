
import { Injectable, Output, EventEmitter } from '@angular/core'
import {MatDialog} from '@angular/material';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { backendUrls } from '../constant/backendurls';
@Injectable()
export class TodoService {
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
        this.headers = new HttpHeaders();
        this.auth()
        return  this.httpClient.get(backendUrls.todo + id,{headers: this.headers});
    } 

    updateTodo(data:object, id:any) {
      this.auth();
      return  this.httpClient.put(backendUrls.todo + id, data, {headers: this.headers});
  }

  addTodo(servers: any){
    this.auth()
    return  this.httpClient.post(backendUrls.todo, servers,{headers: this.headers});
}


}
