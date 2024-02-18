import { HttpClient, HttpErrorResponse, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  API_URL = "https://localhost:7197/api";

  constructor(private httpClient: HttpClient) { }

  get<T>(endpoint: string) : Observable<T> {
    return this.httpClient.get<T>(
      `${this.API_URL}${endpoint}`, {
        headers: this._getHeaders()
      }
    )
  }

  post<T>(endpoint: string, data: any) : Observable<T> {
    return this.httpClient.post<T>(
      `${this.API_URL}${endpoint}`, 
      data, 
      {
        headers: this._getHeaders()
      }
    )
  }

  private _getHeaders(): HttpHeaders {
    return new HttpHeaders()
    .set('Content-Type', 'application/json')
  }

}
