
import { Injectable, Output, EventEmitter } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { backendUrls } from '../constant/backendurls';
@Injectable()
export class RessourceService {
    headers: HttpHeaders;
    avatars: Object
    constructor(private httpClient: HttpClient){}
    

    auth(){
        this.headers =  new HttpHeaders({
            'Content-Type':  'application/json',
            'x-auth-token': JSON.parse(localStorage.getItem('currentUser')).token,
          })
    }
    getRessource(){
        this.headers = new HttpHeaders();
        this.auth();
        return  this.httpClient.get(backendUrls.ressource,{headers: this.headers});
    }

    addRessource(servers: any){
        this.auth()
        return  this.httpClient.post(backendUrls.ressource, servers,{headers: this.headers});
    }

    updateRessource(servers: any, id){
        this.auth()
        return  this.httpClient.post(backendUrls.ressource + id, servers,{headers: this.headers});
    }
}
