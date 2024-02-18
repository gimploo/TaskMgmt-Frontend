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
export class NavbarComponent implements OnDestroy {

  public isAuth!: boolean;
  authsub: Subscription;

  constructor(
    private cdr: ChangeDetectorRef,
    private router: Router,
    private authService: AuthService) 
  {
      this.authsub = this.authService.isAuthenticated.subscribe(
        (value : boolean) => {
          this.isAuth = value;
          this.cdr.detectChanges();
        }
      )
  }

  public logout() : void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }


  ngOnDestroy()
  {
    this.authsub.unsubscribe();
  }

}
