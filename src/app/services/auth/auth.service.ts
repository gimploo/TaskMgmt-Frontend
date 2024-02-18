import { HttpClient } from '@angular/common/http';
import { Injectable, InjectionToken, Injector, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ApiService } from '../api/api.service';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { TOKEN_NAME } from './auth.token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  TOKEN_NAME!: string;

  token: string | null = null;

  public isAuthenticated: boolean = false;

  constructor(
    private api: ApiService, 
    private httpClient: HttpClient,
    private router: Router,
    private inject: Injector
  ) {

    this.TOKEN_NAME = this.inject.get(TOKEN_NAME);
    console.log("Name of the token", this.TOKEN_NAME);
    
    const token = localStorage.getItem(this.TOKEN_NAME);
    if (token != null) {
      this.token = token;
      this.isAuthenticated = true;
    }

  }

  async login(data: FormGroup): Promise<boolean>
  {
    return new Promise<boolean>((resolve, reject) => {

      this.httpClient.post(
        `${this.api.API_URL}/login`,
        {
          "email": data.get('email')!.value,
          "password": data.get('password')!.value,
        },
        { 
          responseType: "text" 
        }
      ).subscribe({
        next: (data: any) => {
          this._setToken(data);
          resolve(true);
        },
        error: (err) => {
          window.alert(err);
          reject(false);
        }
      });

    })
  }

  public logout() : void
  {
    localStorage.removeItem(this.TOKEN_NAME);
    this.isAuthenticated = false;
    this.router.navigate(['/login']);
  }

  public async signup(data: FormGroup) : Promise<boolean>
  {
    return new Promise((resolve, reject) => {
      this.httpClient.post(
      `${this.api.API_URL}/signup`,
        {
          "email": data.get('email')!.value,
          "password": data.get('password')!.value,
          "name": data.get('name')!.value,
          "groupName": data.get('groupName')!.value,
          "referralCode": 
            data.get('referralCode')!.value == "" ? 
            null : data.get('referralCode')!.value
        },
        { responseType: "text" }
        ).subscribe({
          next: (data : any) => {
            this._setToken(data);
            resolve(true);
          },
          error: (err) => {
            window.alert(err.error)
            reject(false);
          }
        });
    })
  }

  private async _setToken(data: string) 
  {
    localStorage.setItem(this.TOKEN_NAME, data);
    this.token = data;
    this.isAuthenticated = true;
  }  

}
