
import { Injectable, Output, EventEmitter } from '@angular/core'
import {MatDialog} from '@angular/material';
import { UpdateProjectComponent } from '../update-project/update-project.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable()
export class ProjectAddService {
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
    addProject(servers: any){
        let url = 'http://localhost:9000/api/projects'
        this.auth()
        return  this.httpClient.post(url, servers,{headers: this.headers});
    }

}
