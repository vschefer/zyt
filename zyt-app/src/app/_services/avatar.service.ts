import { User } from '../_models';
import { Injectable, Output, EventEmitter } from '@angular/core'
import {MatDialog} from '@angular/material';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { backendUrls } from '../constant/backendurls';
@Injectable({ providedIn: 'root' })
export class AvatarService {
  headers: HttpHeaders;
  avatars: Object
  constructor(private httpClient: HttpClient) { }
  
  auth(){
    this.headers =  new HttpHeaders({
      'Content-Type':  'application/json',
      'x-auth-token': JSON.parse(localStorage.getItem('currentUser')).token,
    })
  }
getAvatars(){
  this.headers = new HttpHeaders();
  this.auth()
  return  this.httpClient.get(backendUrls.avatar , {headers: this.headers});
}
  
}
