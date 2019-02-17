import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { backendUrls } from '../constant/backendurls';
import { LocalStorageService } from './localStorage.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  constructor(
    private http: HttpClient,
  ) { }

  login(email: string, password: string) {
    return this.http.post<any>(backendUrls.auth, { email, password })
      .pipe(map(user => {
        if (user && user.token) {
          LocalStorageService.createLocalStorageItem(user);
        }

        return user;
      }));
  }

  logout() {
    LocalStorageService.removeLocalStorageItem();
  }
}
