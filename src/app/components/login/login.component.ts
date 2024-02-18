import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [AuthService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {


  public loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private auth: AuthService,
    private router: Router,
    ){}

  public ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]] 
    })
  }

  onSubmit() : void 
  {
    if (!this.loginForm.valid) return;

    this.auth.login(this.loginForm).then((isSuccessfull : boolean) => {
        if (!isSuccessfull) {
          this.loginForm.reset();
          return;
        }
        window.alert("Login successfull");
        this.router.navigate(['/dashboard']);
    })
  }

}
