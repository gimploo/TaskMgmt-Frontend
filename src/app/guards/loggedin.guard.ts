import { Injectable, Injector } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { Observable } from 'rxjs';
import { TOKEN_NAME } from '../services/auth/auth.token';

@Injectable({
  providedIn: 'root'
})

export class LoggedInGuard implements CanActivate {

  constructor(
    private inject: Injector,
    private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      const tokenName : string = this.inject.get(TOKEN_NAME);

      if (localStorage.getItem(tokenName)) {
        this.router.navigate(['/dashboard']);
        return false;
      } else {
        return true;
      }
  }
}