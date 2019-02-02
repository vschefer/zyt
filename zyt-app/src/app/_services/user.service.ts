import { User } from '../_models';
import { Injectable, Output, EventEmitter } from '@angular/core'
import {MatDialog} from '@angular/material';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { backendUrls } from '../constant/backendurls';

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
    this.headers = new HttpHeaders();
    this.auth()
    return  this.httpClient.put(backendUrls.user + id, data, {headers: this.headers});
  } 
  getMe(){
    this.headers = new HttpHeaders();
    this.auth()
    return  this.httpClient.get(backendUrls.me,{headers: this.headers});
  } 
  deactivateUser(id){
    this.headers = new HttpHeaders();
    this.auth();
    return  this.httpClient.put(backendUrls.user + id, {archived: true}, {headers: this.headers});
  }
  activateUser(id:any) {
    this.auth();
    return  this.httpClient.put(backendUrls.user + id, {archived: false}, {headers: this.headers});
  }
  
  getUsers(){
    this.headers = new HttpHeaders();
    this.auth();
    return  this.httpClient.get(backendUrls.user,{headers: this.headers});
  }
  getUser(id){
    this.headers = new HttpHeaders();
    this.auth();
    return  this.httpClient.get(backendUrls.user + id,{headers: this.headers});
}
updateUser(data:object, id:any) {
    this.auth();
    return  this.httpClient.put(backendUrls.user + id, data, {headers: this.headers});
}
addUser(servers: any){
  this.auth()
  return  this.httpClient.post(backendUrls.user, servers,{headers: this.headers});
}
  
}
