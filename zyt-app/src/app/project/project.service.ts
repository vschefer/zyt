import { Injectable } from '@angular/core';
// import {Http, Headers} from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from "rxjs/operators";
import { Observable } from 'rxjs';
import { from } from 'rxjs';
@Injectable()
export class ProjectService {
    headers: HttpHeaders;
    avatars: Object
    constructor(private httpClient: HttpClient){

    }

    auth(){
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('x-auth-token', JSON.parse(localStorage.getItem('currentUser')).token);
    }
    add(servers: any, url: string){
        this.headers = new HttpHeaders();
        this.auth()
        return  this.httpClient.post(url, servers,{headers: this.headers});
    }

    getAll(url:string){
        this.headers = new HttpHeaders();
        this.auth();
        return  this.httpClient.get(url,{headers: this.headers});
    }
    
    static getAllStatic(url:string){
        const headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        headers.append('x-auth-token', JSON.parse(localStorage.getItem('currentUser')).token);
        
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
        this.headers = new HttpHeaders();
        this.auth();
        return  this.httpClient.put(url, data, {headers: this.headers});
    }
}
