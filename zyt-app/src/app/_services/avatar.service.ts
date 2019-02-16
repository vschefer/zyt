import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http';
import { backendUrls } from '../constant/backendurls';
import { LocalStorageService } from './localStorage.service';

@Injectable({ providedIn: 'root' })
export class AvatarService extends LocalStorageService {

  constructor( private httpClient: HttpClient ) {
    super();
  }

  getAvatars() {
    return this.httpClient.get(backendUrls.avatar , { headers: this.headers } );
  }
}
