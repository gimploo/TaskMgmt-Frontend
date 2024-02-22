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
    private router: Router,
    private toasterService: ToasterService,
    private injector: Injector) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const tokenName : string = this.injector.get(TOKEN_NAME);
    const isAuth: boolean = false;

    if (!localStorage.getItem(tokenName)) 
      return next.handle(request);

    request = request.clone({ 
      headers: request.headers.set(
        'Authorization', `Bearer ${localStorage.getItem(tokenName)}`
      ) 
    });

    return next.handle(request)
    .pipe(
      catchError((error: HttpErrorResponse) => {
          if (error.status === 401)
          {
            this.toasterService.unauthorized('Sorry, you are not authorized to access this resource');
            this.router.navigate(['/dashboard']);
          }
          throw new Error("ouoiuoiu");
      })
    );
  }
}
