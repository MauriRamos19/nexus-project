import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  private readonly url = 'http://localhost:8888/api/auth/signIn'
  private readonly authUrl = 'http://localhost:8888/api/auth/'

  login(entity: any): Observable<any> {
    return this.http.post<any>(this.url, entity);
  }

  register(entity: any, typeEntity: any): Observable<any> {
    return this.http.post<any>(this.authUrl + typeEntity, entity);
  }
  
}
