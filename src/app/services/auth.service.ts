import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, tap, throwError } from 'rxjs';
import { User } from '../models/user';
import { Restaurant } from '../models/Restaurant';


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private subject = new BehaviorSubject<boolean>(this.getInitialAuthState());

  constructor(private http: HttpClient) { }
  
  loginPost(body: User): Observable<any> {
    
    const loginUrl = "https://localhost:7208/api/auth/login";

    return this.http.post(loginUrl, body)
      .pipe(
        tap((response: any) => {
          if (response.accessToken) {
            sessionStorage.setItem('authToken', response.accessToken);
            sessionStorage.setItem('refreshToken', response.refreshToken);
          }
        }),
        catchError(error => {
          console.error('Login Error:', error);
          return throwError(() => new Error(error));
        })
      );
  }

  registerPost(body: User) {
    const registerUrl = "https://localhost:7208/api/auth/register";
    return this.http.post(registerUrl, body);
  }

  logout() {
    sessionStorage.clear();
  }

  isAuthenticated(): Observable<boolean> {
    return this.subject.asObservable();
  }

  setAuthenticated(value: boolean) {
    sessionStorage.setItem('isAuthenticated', JSON.stringify(value));
    this.subject.next(value);
  }

  private getInitialAuthState(): boolean {
    const isAuthenticated = sessionStorage.getItem('isAuthenticated');
    return isAuthenticated ? JSON.parse(isAuthenticated) : false;
  }


  // loginPost(body: User) {
  //   debugger;
  //   this.http.post(connectionString, body).subscribe((token: any) => {
  //     if(token.accessToken) {
  //       alert("Login Sucess")
  //       localStorage.setItem('authToken', token.accessToken),
  //       localStorage.setItem('refreshToken', token.refreshToken)
  //     } else {
  //       alert("Login failed")
  //     }
  //   });
  // }


  
}
