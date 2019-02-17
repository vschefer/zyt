import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http';
import { backendUrls } from '../constant/backendurls';
import { LocalStorageService } from './localStorage.service';

@Injectable()
export class TodoService extends LocalStorageService {

  constructor( private httpClient: HttpClient ) {
    super();
  }

  getTodo(id) {
    return this.httpClient.get(backendUrls.todo + id, { headers: this.headers } );
  } 

  updateTodo(data:object, id:any) {
    return this.httpClient.put(backendUrls.todo + id, data, { headers: this.headers } );
  }

  addTodo(servers: any) {
    return this.httpClient.post(backendUrls.todo, servers, { headers: this.headers } );
  }
}
