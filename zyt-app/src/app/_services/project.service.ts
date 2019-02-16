
import { Injectable, Output, EventEmitter } from '@angular/core'
import {MatDialog} from '@angular/material';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { backendUrls } from '../constant/backendurls';

@Injectable()
export class ProjectService {
    id
    headers: HttpHeaders;
    avatars: Object
    constructor(public dialog: MatDialog, private httpClient: HttpClient){}

    auth(){
        this.headers =  new HttpHeaders({
            'Content-Type':  'application/json',
            'x-auth-token': JSON.parse(localStorage.getItem('currentUser')).token,
          })
    }
    //GET all Projects
    getProjects(){
        this.headers = new HttpHeaders();
        this.auth();
        return  this.httpClient.get(backendUrls.project,{headers: this.headers});
    }
    //GET specific Project
    getProject(id){
        this.headers = new HttpHeaders();
        this.auth();
        return  this.httpClient.get(backendUrls.project + id,{headers: this.headers});
    }
    // PUT Project
    updateProject(data:object, id:any) {
        this.auth();
        return  this.httpClient.put(backendUrls.project + id, data, {headers: this.headers});
    }
    // POST Project
    addProject(servers){
        this.auth()
        return  this.httpClient.post(backendUrls.project, servers,{headers: this.headers});
    }
}
