import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class Interceptor implements HttpInterceptor {
  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const new_req = httpRequest.clone({
        headers: httpRequest.headers.append('Access-Control-Allow-Origin','*')
        });
    return next.handle(new_req);
  }
}