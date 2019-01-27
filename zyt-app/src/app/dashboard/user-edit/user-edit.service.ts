
import { Injectable, Output, EventEmitter } from '@angular/core'
import {MatDialog} from '@angular/material';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable()
export class UserEditService {
    headers: HttpHeaders;
    avatars: Object
    constructor(public dialog: MatDialog, private httpClient: HttpClient){} 

    auth(){
        this.headers =  new HttpHeaders({
            'Content-Type':  'application/json',
            'x-auth-token': JSON.parse(localStorage.getItem('currentUser')).token,
          })
    }

    updateMe(data, id){
        let url = 'http://localhost:9000/api/users/';
        this.headers = new HttpHeaders();
        this.auth()
        return  this.httpClient.put(url + id, data, {headers: this.headers});
    } 
    getAvatars(){
        let url = 'http://localhost:9000/api/avatars';
        this.headers = new HttpHeaders();
        this.auth()
        return  this.httpClient.get(url , {headers: this.headers});
    }
}
