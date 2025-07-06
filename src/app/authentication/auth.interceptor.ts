import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  // dominios externos sin Bearer
  private excludedUrls = [
    'https://freesound.org',
    'https://pixabay.com',
    'https://68618fba8e74864084466873.mockapi.io'
  ];

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');

    const isExcluded = this.excludedUrls.some(url => req.url.startsWith(url));
    if (isExcluded) {
      return next.handle(req); 
    }

    if (token) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + token)
      });
      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}
