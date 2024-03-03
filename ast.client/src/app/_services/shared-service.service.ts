import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {
  private apiUrl = 'https://localhost:7122/api/';

  constructor(private http: HttpClient) { }

  register(email: string, password: string) {
    return this.http.post<any>(`${this.apiUrl}account/register`, { email, password });
  }

  login(email: string, password: string, rememberMe: boolean) {
    return this.http.post<any>(`${this.apiUrl}account/login`, { email, password, rememberMe });
  }

  logout() {
    return this.http.post<any>(`${this.apiUrl}account/logout`, {});
  }

  resetPassword(email: string, newPassword: string) {
    return this.http.post<any>(`${this.apiUrl}account/resetpassword`, { email, newPassword });
  }
}
