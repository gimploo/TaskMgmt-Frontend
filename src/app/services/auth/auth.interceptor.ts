import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { Inject, Injectable, Injector } from '@angular/core';
import { Observable, catchError, tap } from 'rxjs';
import { ApiService } from '../api/api.service';
import { AuthService} from './auth.service';
import { Router } from '@angular/router';
import { TOKEN_NAME } from './auth.token';

@Injectable({
  providedIn: 'root'
})
export class authInterceptor implements HttpInterceptor {
  constructor(private injector: Injector) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const tokenName : string = this.injector.get(TOKEN_NAME);

    if (!localStorage.getItem(tokenName)) return next.handle(request);

    console.log("Intercepted");
    request = request.clone({ 
      headers: request.headers.set(
        'Authorization', `Bearer ${localStorage.getItem('token')}`
      ) 
    });

    return next.handle(request);
  }
}
