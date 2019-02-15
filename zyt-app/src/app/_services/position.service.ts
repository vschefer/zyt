
import { Injectable, Output, EventEmitter } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { backendUrls } from '../constant/backendurls';
@Injectable()
export class PositionService {
    headers: HttpHeaders;
    constructor(private httpClient: HttpClient){}

    auth(){
        this.headers =  new HttpHeaders({
            'Content-Type':  'application/json',
            'x-auth-token': JSON.parse(localStorage.getItem('currentUser')).token,
          })
    }

    // POST Position
    addPosition(data: any){
        this.auth()
        return  this.httpClient.post(backendUrls.positions, data, {headers: this.headers});
    }

    // PUT Position
    updatePosition(data:object, id:any) {
        this.auth();
        return  this.httpClient.put(backendUrls.positions + id, data, {headers: this.headers});
    }
    
    // DELETE Position
    activateDeactivatePosition(id, archived){
      this.auth();
      return  this.httpClient.put(backendUrls.positions + id, {archived: archived}, {headers: this.headers});
    }
}
