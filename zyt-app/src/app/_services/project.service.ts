
import { Injectable, Output, EventEmitter } from '@angular/core'
import {MatDialog} from '@angular/material';
import { UpdateProjectComponent } from '../project/update-project/update-project.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable()
export class ProjectService {
    id
    headers: HttpHeaders;
    avatars: Object
    constructor(public dialog: MatDialog, private httpClient: HttpClient){}
    
    openDialog(projectId): void {   
        const dialogRef = this.dialog.open(UpdateProjectComponent, {
        });
        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            
        });  
    } 

    auth(){
        this.headers =  new HttpHeaders({
            'Content-Type':  'application/json',
            'x-auth-token': JSON.parse(localStorage.getItem('currentUser')).token,
          })
    }
    //GET all Projects
    getProjects(){
        let url = 'http://localhost:9000/api/projects';
        this.headers = new HttpHeaders();
        this.auth();
        return  this.httpClient.get(url,{headers: this.headers});
    }
    //GET specific Project
    getProject(id){
        let url = 'http://localhost:9000/api/projects/';
        this.headers = new HttpHeaders();
        this.auth();
        return  this.httpClient.get(url + id,{headers: this.headers});
    }
    // PUT Project
    updateProject(data:object, id:any) {
        let url = 'http://localhost:9000/api/projects/'
        this.auth();
        return  this.httpClient.put(url + id, data, {headers: this.headers});
    }
    // POST Project
    addProject(servers){
        let url = 'http://localhost:9000/api/projects/'
        this.auth()
        return  this.httpClient.post(url, servers,{headers: this.headers});
    }
}
