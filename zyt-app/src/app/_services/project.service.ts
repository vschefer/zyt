
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http';
import { backendUrls } from '../constant/backendurls';
import { LocalStorageService } from './localStorage.service';

@Injectable()
export class ProjectService extends LocalStorageService {
  id: string;
  
  constructor( private httpClient: HttpClient ) {
    super();
  }

  getProjects() {
    return this.httpClient.get(backendUrls.project, { headers: this.headers } );
  }

  getProject(id) {
    return this.httpClient.get(backendUrls.project + id, { headers: this.headers } );
  }

  updateProject(data:object, id:any) {
    return this.httpClient.put(backendUrls.project + id, data, { headers: this.headers });
  }

  addProject(servers) {
    return this.httpClient.post(backendUrls.project, servers, { headers: this.headers } );
  }
}
