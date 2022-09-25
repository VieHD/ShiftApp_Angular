import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpParams,
  HttpErrorResponse
} from '@angular/common/http';
import {
  StatusCodes
} from 'http-status-codes';

import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from '../core/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private router: Router) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const currentSession = this.authService.session.getValue();
    const currentToken = currentSession?.token;

    if (currentToken) {
      const requestWithAuth = request.clone({
        params: request.params.append('auth', currentToken)
      })  

      return next.handle(requestWithAuth).pipe(
        catchError(
          (error: HttpErrorResponse) => {
            console.log(error.error.error.message)
            if (error.status === StatusCodes.UNAUTHORIZED) {
              this.authService.logout();
              this.router.navigate(["auth"], {queryParams:{
                error:'unauthorized'
              }});
            }
            return throwError(() => new Error(error.error.error.message));
          })
      )
    }
    if (currentToken) {
      const requestWithAuth = request.clone({
        params: new HttpParams().append('auth', currentToken)
      })

      return next.handle(requestWithAuth);
    }

    return next.handle(request);
  }
}
