import { Injectable } from '@angular/core'
import { HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  headers: HttpHeaders;
  tokenString: string;
  
  constructor() {
    this.tokenString = JSON.parse(localStorage.getItem('currentUser')).token;
    this.headers = new HttpHeaders({
      'Content-Type':  'application/json',
      'x-auth-token': this.tokenString,
    });
  }
  
  static getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
  }
  
  static createLocalStorageItem(user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }
  
  static removeLocalStorageItem() {
    localStorage.removeItem('currentUser');
  }
}
