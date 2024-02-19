import { ChangeDetectorRef, Component, Inject, OnDestroy } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TOKEN_NAME } from '../../services/auth/auth.token';
import { AuthService } from '../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  public isAuth!: boolean;

  constructor(
    private cdr: ChangeDetectorRef,
    private router: Router,
    private authService: AuthService) 
  {
    authService.isAuthenticated.subscribe((value) => {
      this.isAuth = value;
    });
  }

  public logout() : void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }


}
