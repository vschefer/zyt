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
        this.headers.append('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YzA1OWJkYzExM2FkMTQ2NTI4OTE2MDUiLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNTQzODcxNTI4fQ.0HQG8F4xRlXD2mQcycKfozJF4Sw6UtrbyE7MELvZE1Q')
        // this.headers.append('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YmYzMWFmNTQwZWI4NDQwYmI1ZjU0ZGMiLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNTQyNjU5OTE1fQ.uwyBTze0LR0bqJiK8vo7cH1RpXGkf0h6uARCR0zsuyA');
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