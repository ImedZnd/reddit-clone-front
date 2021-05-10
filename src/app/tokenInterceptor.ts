import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { AuthService } from './auth/shared/auth.service';
import { catchError, switchMap } from 'rxjs/operators';
import { LoginResponsePayload } from './model/login-response.payload';

@Injectable({
    providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {

    isTokenRefreshing = false;
    refreshTokenSubject: BehaviorSubject = new BehaviorSubject(null);
    constructor(public authService: AuthService,
                private httpRequest:HttpRequest) { }

    intercept(req: HttpRequest<any>, next:HttpHandler): Observable<HttpEvent<any>> {
            const jwtToken = this.authService.getJwtToken();
        if (jwtToken) {
            this.addToken(req, jwtToken);
        }
        return next.handle(req).pipe(catchError(error => {
            if(error instanceof HttpErrorResponse && error.status ===403){
                return this.handleAuthErrors(req,next);
            }else{
                return throwError(error);
            }
        }));
    }
    private handleAuthErrors(req: HttpRequest, next: HttpHandler) {
        if (!this.isTokenRefreshing) {
            this.isTokenRefreshing = true;
            this.refreshTokenSubject.next(null);

            return this.authService.refreshToken().pipe(
                switchMap((refreshTokenResponse: LoginResponsePayload) => {
                    this.isTokenRefreshing = false;
                    this.refreshTokenSubject.next(refreshTokenResponse.authenticationToken);
                    return next.handle(this.addToken(req, refreshTokenResponse.authenticationToken));
                })
            )
        }
    }



    private addToken(req: HttpRequest<any>, jwtToken: string) {
        return req.clone({
            headers: req.headers.set('Authorization',
                'Bearer ' + jwtToken)
        });
    }

}