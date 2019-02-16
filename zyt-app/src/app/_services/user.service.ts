import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http';
import { backendUrls } from '../constant/backendurls';
import { LocalStorageService } from './localStorage.service';

@Injectable({ providedIn: 'root' })
export class UserService extends LocalStorageService {
  
  constructor( private httpClient: HttpClient ) {
    super();
  }
  
  updateMe(data, id) {
    return this.httpClient.put(backendUrls.user + id, data, { headers: this.headers } );
  }
  
  getMe() {
    return this.httpClient.get(backendUrls.me, { headers: this.headers } );
  }
  
  deactivateUser(id) {
    return this.httpClient.put(backendUrls.user + id, { archived: true }, { headers: this.headers } );
  }
  
  activateUser(id:any) {
    return this.httpClient.put(backendUrls.user + id, { archived: false }, { headers: this.headers } );
  }
  
  getUsers() {
    return this.httpClient.get(backendUrls.user, { headers: this.headers } );
  }
  
  getUser(id) {
    return this.httpClient.get(backendUrls.user + id, { headers: this.headers } );
  }
  
  updateUser(data:object, id:any) {
    return this.httpClient.put(backendUrls.user + id, data, { headers: this.headers } );
  }
  
  addUser(servers: any) {
    return this.httpClient.post(backendUrls.user, servers, { headers: this.headers } );
  }
}
