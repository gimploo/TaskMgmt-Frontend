import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { Inject, Injectable, Injector } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { ApiService } from '../services/api/api.service';
import { AuthService} from '../services/auth/auth.service';
import { Router } from '@angular/router';
import { TOKEN_NAME } from '../services/auth/auth.token';
import { ToasterService } from '../services/toaster/toaster.service';

@Injectable({
  providedIn: 'root'
})
export class authInterceptor implements HttpInterceptor {
  constructor(
    private toasterService: ToasterService,
    private injector: Injector) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const tokenName : string = this.injector.get(TOKEN_NAME);
    const isAuth: boolean = false;

    if (!localStorage.getItem(tokenName)) return next.handle(request);

    request = request.clone({ 
      headers: request.headers.set(
        'Authorization', `Bearer ${localStorage.getItem(tokenName)}`
      ) 
    });

    return next.handle(request)
    .pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
          // dk what to do here
        }
      }),
      catchError((error: HttpErrorResponse) => {
        this.toasterService.error(error.error);
        return throwError(() => error);
      })
    );
  }
}
