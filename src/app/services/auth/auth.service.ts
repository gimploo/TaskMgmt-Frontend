import { HttpClient } from '@angular/common/http';
import { Injectable, InjectionToken, Injector, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ApiService } from '../api/api.service';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { TOKEN_NAME } from './auth.token';
import { ToasterService } from '../toaster/toaster.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  TOKEN_NAME!: string;

  token: string | null = null;

  public isAuthenticatedSubject : BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private api: ApiService, 
    private toaster: ToasterService,
    private httpClient: HttpClient,
  ) 
  {
    this.TOKEN_NAME = inject(TOKEN_NAME);
    const token = localStorage.getItem(this.TOKEN_NAME);
    if (token != null) {
      this._setAuthenticated(true);
    }
  }

  private _setAuthenticated(flag : boolean)
  {
    this.isAuthenticatedSubject.next(flag);
  }

  public isUserAuthenticated() : boolean
  {
    return (this.token === null);
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
          this.toaster.success("Successfully logged in!");
          resolve(true);
        },
        error: (err) => {
          console.log(err.error);
          this.toaster.error(err.error);
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
            this.toaster.success("Successfully signed in!");
            resolve(true);
          },
          error: (err) => {
            console.log(err.error);
            this.toaster.error(err.error);
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
