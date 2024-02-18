import { ApplicationConfig, InjectionToken, inject } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService} from './services/auth/auth.service';
import { TOKEN_NAME } from './services/auth/auth.token';
import { authInterceptor } from './services/auth/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    {
      provide: TOKEN_NAME, useValue: 'token'
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: authInterceptor,
      multi: true
    }
  ]
};
