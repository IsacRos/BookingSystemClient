import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { User } from '../models/user';

const connectionString = "https://localhost:7208/api/auth/login";

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient) { }

  loginPost(body: User): Observable<any> {
    const url = 'your-api-endpoint'; // Replace with your actual login API endpoint

    return this.http.post(connectionString, body)
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

  GetRestaurant() {
    return this.http.get('https://localhost:7208/api/Restaurant')
  }

  
}
