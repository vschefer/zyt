
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http';
import { backendUrls } from '../constant/backendurls';
import { LocalStorageService } from './localStorage.service';

@Injectable()
export class PositionService extends LocalStorageService {
  
  constructor( private httpClient: HttpClient ) {
    super();
  }

  addPosition(data: any) {
      return this.httpClient.post(backendUrls.positions, data, { headers: this.headers } );
  }

  updatePosition(data:object, id:any) {
      return this.httpClient.put(backendUrls.positions + id, data, { headers: this.headers } );
  }
  
  activateDeactivatePosition(id, archived) {
    return this.httpClient.put(backendUrls.positions + id, { archived: archived }, { headers: this.headers } );
  }
}
