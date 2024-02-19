import { HttpClient } from '@angular/common/http';
import { Injectable, InjectionToken, Injector, OnDestroy, OnInit, signal } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ApiService } from '../api/api.service';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { TOKEN_NAME } from './auth.token';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {

  TOKEN_NAME!: string;

  token: string | null = null;

  public isAuthenticated : BehaviorSubject<boolean> = new BehaviorSubject(false);

  private _setAuthenticated(flag : boolean)
  {
    this.isAuthenticated.next(flag);
  }

  constructor(
    private api: ApiService, 
    private httpClient: HttpClient,
    private inject: Injector
  ) {
    console.log("Auth service constructor inside");
    this.TOKEN_NAME = this.inject.get(TOKEN_NAME);
    const token = localStorage.getItem(this.TOKEN_NAME);
    if (token != null) {
      console.log("Auth service token found");
      this._setAuthenticated(true);
    }
  }

  public ngOnInit(): void 
  {
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
          console.log("Auth service user logged in");
          resolve(true);
        },
        error: (err) => {
          window.alert(err.error);
          resolve(false);
        }
      });

    })
  }

  public logout() : void
  {
    localStorage.removeItem(this.TOKEN_NAME);
    this._setAuthenticated(false);
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
          next: async (data : any) => {
           this._setToken(data);
            console.log("Auth service user signed up");
            resolve(true);
          },
          error: (err) => {
            window.alert(err.error)
            resolve(true);
          }
        });
    })
  }

  private _setToken(data: string) 
  {
    localStorage.setItem(this.TOKEN_NAME, data);
    this.token = data;
    this._setAuthenticated(true);
  }  

}
