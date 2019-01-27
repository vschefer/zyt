import { Injectable } from '@angular/core';
// import {Http, Headers} from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { map } from "rxjs/operators";
import { Observable } from 'rxjs';
import { from } from 'rxjs';
@Injectable()
export class ServerService {
    headers: HttpHeaders;
    avatars: Object
    constructor(private http: HttpClient){

    }

    auth(){
        this.headers =  new HttpHeaders({
            'Content-Type':  'application/json',
            'x-auth-token': JSON.parse(localStorage.getItem('currentUser')).token,
          })
    }
    add(servers: any, url: string){
        this.auth()
        return  this.http.post(url, servers,{headers: this.headers});
    }

    getAll(url:string){
        this.auth();
        return  this.http.get(url,{headers: this.headers});
    }
    
    static getAllStatic(url:string){
        // Convert fetch to RxJS Observable
        var response = from(
          fetch(url, {
            cache: "no-cache",
            headers: {
              'Content-Type': 'application/json',
              'x-auth-token': JSON.parse(localStorage.getItem('currentUser')).token,
            }
          }));
        // result.subscribe(x => console.log(x), e => console.error(e));
        
        return response;
    }

    put(url:string, data:object) {
        this.auth();
        return  this.http.put(url, data, {headers: this.headers});
    }
}
