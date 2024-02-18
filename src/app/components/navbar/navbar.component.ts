import { Component, Inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TOKEN_NAME } from '../../services/auth/auth.token';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  public userAuthenticated!: boolean;

  constructor(
    @Inject(TOKEN_NAME) tokenName : string
  ) {}

  
}
