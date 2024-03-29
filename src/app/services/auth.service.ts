import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { User } from '../models/user';
import { Restaurant } from '../models/Restaurant';


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  
  constructor(private http: HttpClient) { }
  
  loginPost(body: User): Observable<any> {
    
    const loginUrl = "https://localhost:7208/api/auth/login";

    return this.http.post(loginUrl, body)
      .pipe(
        tap((response: any) => {
          if (response.accessToken) {
            localStorage.setItem('authToken', response.accessToken);
            localStorage.setItem('refreshToken', response.refreshToken);
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
    localStorage.clear();
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
