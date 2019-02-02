import { User } from '../_models';
import { Injectable, Output, EventEmitter } from '@angular/core'
import {MatDialog} from '@angular/material';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class UserService {
  headers: HttpHeaders;
  avatars: Object
  constructor(private httpClient: HttpClient) { }
  
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
  getMe(){
    let url = 'http://localhost:9000/api/users/me';
    this.headers = new HttpHeaders();
    this.auth()
    return  this.httpClient.get(url,{headers: this.headers});
  } 
  deactivateUser(id){
    let url = 'http://localhost:9000/api/users/';
    this.headers = new HttpHeaders();
    this.auth();
    return  this.httpClient.put(url + id, {archived: true}, {headers: this.headers});
  }
  activateUser(id:any) {
    let url = 'http://localhost:9000/api/users/';
    this.auth();
    return  this.httpClient.put(url + id, {archived: false}, {headers: this.headers});
  }
  
  getUsers(){
    let url = 'http://localhost:9000/api/users/';
    this.headers = new HttpHeaders();
    this.auth();
    return  this.httpClient.get(url,{headers: this.headers});
  }
  getUser(id){
    let url = 'http://localhost:9000/api/users/';
    this.headers = new HttpHeaders();
    this.auth();
    return  this.httpClient.get(url + id,{headers: this.headers});
}
updateUser(data:object, id:any) {
    let url = 'http://localhost:9000/api/users/'
    this.auth();
    return  this.httpClient.put(url + id, data, {headers: this.headers});
}
addUser(servers: any){
  let url = 'http://localhost:9000/api/users'
  this.auth()
  return  this.httpClient.post(url, servers,{headers: this.headers});
}
  
}
