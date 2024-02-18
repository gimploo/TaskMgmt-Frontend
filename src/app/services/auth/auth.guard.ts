import { Injectable, Injector } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { TOKEN_NAME } from './auth.token';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(
    private inject: Injector,
    private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      const tokenName : string = this.inject.get(TOKEN_NAME);

      if (localStorage.getItem(tokenName)) {
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }
  }
}