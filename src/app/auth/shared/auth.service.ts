import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SignupRequestPayload } from 'src/app/model/signup-request.payload';
import { LoginRequestPayload } from 'src/app/model/login-request.payload';
import { LoginResponsePayload } from 'src/app/model/login-response.payload';
import { map, tap } from 'rxjs/operators';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient ,
              private localStorage:LocalStorageService) {
  }

  signup(signupRequestPayload: SignupRequestPayload): Observable<any> {
    console.log(signupRequestPayload);
    return this.httpClient.post('http://localhost:8080/api/auth/signup', signupRequestPayload, { responseType: 'text' });
  }

  login(loginRequestPayload: LoginRequestPayload):Observable<boolean>{
    return this.httpClient.post<LoginResponsePayload>('http://localhost:8080/api/auth/login', loginRequestPayload)
     .pipe(map(data=>{
        this.localStorage.store('authenticationToken',data.authenticationToken);
        this.localStorage.store('username',data.username);
        this.localStorage.store('refreshToken',data.refreshToken);
        this.localStorage.store('expiresAt',data.expiresAt);
        return true;
     }))
      
    }

    refreshToken() {
      const refreshTokenPayload = {
        refreshToken: this.getRefreshToken(),
        username: this.getUserName()
      }
      return this.httpClient.post<LoginResponsePayload>('http://localhost:8080/api/auth/refresh/token',
        refreshTokenPayload)
        .pipe(tap(response => {
          this.localStorage.store('authenticationToken', response.authenticationToken);
          this.localStorage.store('expiresAt', response.expiresAt);
        }));
    }
  
    getJwtToken() {
      return this.localStorage.retrieve('authenticationToken');
    }
  
    getRefreshToken() {
      return this.localStorage.retrieve('refreshToken');
    }
  
    getUserName() {
      return this.localStorage.retrieve('username');
    }
  
    getExpirationTime() {
      return this.localStorage.retrieve('expiresAt');
    }
}