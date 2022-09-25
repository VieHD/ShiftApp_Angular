import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { adaptResponse } from '../utils';

@Injectable()
export class FirebaseRDInterceptor implements HttpInterceptor {


  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url.includes('shift-app-6e06d-default-rtdb')) {
      const changedRequest = request.clone({
        url: request.url + ".json"
      })
      return next.handle(changedRequest).pipe(
        map((response) => {
          if (response instanceof HttpResponse) {
            const modifiedResponse = response.clone({
              body: adaptResponse(response.body)
            })
            return modifiedResponse;
          }

          return response;
        })
      )
    }

    return next.handle(request);
  }
}
