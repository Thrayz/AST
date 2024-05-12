import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {
  private apiUrl = 'https://localhost:7122/api/';

  constructor(private http: HttpClient) { }

  register(email: string,username:string,phoneNumber: string, password: string) {
    return this.http.post<any>(`${this.apiUrl}account/register`, { email,username,phoneNumber, password });
  }

  login(email: string, password: string, rememberMe: boolean) {
    return this.http.post<any>(`${this.apiUrl}account/login`, { email, password, rememberMe })
      .pipe(
        tap((response: any) => {
          if (response.token) {
            localStorage.setItem('token', response.token);
          } else {
            console.error('Login failed');
          }
        }),
        catchError((error: any) => {
          console.error('Error:', error);
          return throwError(error);
        })
      );
  }


  logout() {
    localStorage.removeItem('token');
    return this.http.post<any>(`${this.apiUrl}account/logout`, {});
  }

  resetPassword(email: string, newPassword: string) {
    return this.http.post<any>(`${this.apiUrl}account/resetpassword`, { email, newPassword });
  }


  getUsers() {
    return this.http.get<any[]>(`${this.apiUrl}account/users`);
  }

  isAuthenticated() {
    if(localStorage.getItem('token')) {
  
      return true;
    } else {  
      return false;
    }
  }








}
