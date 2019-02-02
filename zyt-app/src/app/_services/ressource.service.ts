
import { Injectable, Output, EventEmitter } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
        let url = 'http://localhost:9000/api/ressources';
        this.headers = new HttpHeaders();
        this.auth();
        return  this.httpClient.get(url,{headers: this.headers});
    }

    addRessource(servers: any){
        let url = 'http://localhost:9000/api/ressources'
        this.auth()
        return  this.httpClient.post(url, servers,{headers: this.headers});
    }

    updateRessource(servers: any, id){
        let url = 'http://localhost:9000/api/ressources/'
        this.auth()
        return  this.httpClient.post(url + id, servers,{headers: this.headers});
    }
}
