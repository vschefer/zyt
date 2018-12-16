import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import { map } from "rxjs/operators";
@Injectable()
export class ServerService {
    headers: Headers;
    avatars: Object
    constructor(private http: Http){

    }

    auth(){
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('x-auth-token', JSON.parse(localStorage.getItem('currentUser')).token);
    }
    add(servers: any, url: string){
        this.headers = new Headers();
        this.auth()
        return  this.http.post(url, servers,{headers: this.headers});
    }

    getAll(url:string){
        this.headers = new Headers();
        this.auth();
        return  this.http.get(url,{headers: this.headers});
    }
    put(servers: any, url: string){
        this.headers = new Headers();
        this.auth()
        return  this.http.post(url, servers,{headers: this.headers});
    }
    
}
