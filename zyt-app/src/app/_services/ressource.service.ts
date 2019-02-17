import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http';
import { backendUrls } from '../constant/backendurls';
import { LocalStorageService } from './localStorage.service';

@Injectable()
export class RessourceService extends LocalStorageService {

  constructor( private httpClient: HttpClient ) {
    super();
  }

  getRessource(id: string = '') {
    return this.httpClient.get(backendUrls.ressource + id, { headers: this.headers } );
  }

  addRessource(servers: any) {
    return this.httpClient.post(backendUrls.ressource, servers, { headers: this.headers } );
  }

  updateRessource(data:object, id:any) {
    return this.httpClient.put(backendUrls.ressource + id, data, { headers: this.headers } );
  }
}
